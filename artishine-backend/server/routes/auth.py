from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from ..firebase_config import get_auth, get_db
from ..models.schemas import RegisterRequest, VerifyTokenRequest
from ..utils.storage import ensure_user_folder, ensure_name_folder_with_profile
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])


class InitProfileRequest(BaseModel):
    id_token: str
    name: str
    user_type: str  # 'artisan' | 'buyer'


@router.post("/register")
def register(req: RegisterRequest):
    """
    Creates a Firebase Auth user and stores profile in Firestore:
    - Collection: artisans/ or buyers/ (plural), doc id = uid
    - Sets custom claims: {"role": user_type}
    - Ensures per-user folders:
      - UID-based folder (legacy visibility .init)
      - Name-based folder with profile.json under artisans/{displayName}/ or buyers/{displayName}/
    """
    auth = get_auth()
    db = get_db()

    try:
        # Create auth user
        user_record = auth.create_user(
            email=req.email,
            password=req.password,
            display_name=req.name,
            email_verified=False,
            disabled=False,
        )

        uid = user_record.uid

        # Set custom claims
        auth.set_custom_user_claims(uid, {"role": req.user_type})

        # Write Firestore document (UID as the document id)
        collection = "artisans" if req.user_type == "artisan" else "buyers"
        now = datetime.now(timezone.utc).isoformat()
        db.collection(collection).document(uid).set({
            "name": req.name,
            "email": req.email,
            "userType": req.user_type,
            "createdAt": now,
            "updatedAt": now,
        })

        # Ensure Storage folders
        legacy_placeholder = ensure_user_folder(uid, req.user_type)
        name_folder_paths = ensure_name_folder_with_profile(uid, req.user_type, req.name, req.email)

        return {
            "success": True,
            "uid": uid,
            "userType": req.user_type,
            "storage": {
                "legacy": legacy_placeholder,
                "nameFolder": name_folder_paths,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/init-profile")
def init_profile(req: InitProfileRequest):
    """
    Client-first registration flow:
    - Frontend creates the user with Firebase client SDK (email/password).
    - Frontend sends ID token + name + user_type here.
    - Backend verifies token, sets custom claims, creates Firestore doc,
      and ensures Storage folders:
        - UID-based folder (.init)
        - Name-based folder with profile.json under artisans/{displayName}/ or buyers/{displayName}/
    """
    auth = get_auth()
    db = get_db()

    try:
        decoded = auth.verify_id_token(req.id_token)
        uid = decoded.get("uid")
        email = decoded.get("email")
        if not uid:
            raise ValueError("Invalid token: no uid")

        if req.user_type not in ("artisan", "buyer"):
            raise ValueError("user_type must be 'artisan' or 'buyer'")

        # Set custom claims for role
        auth.set_custom_user_claims(uid, {"role": req.user_type})

        # Upsert Firestore doc (UID as the document id)
        collection = "artisans" if req.user_type == "artisan" else "buyers"
        now = datetime.now(timezone.utc).isoformat()
        db.collection(collection).document(uid).set({
            "name": req.name,
            "email": email,
            "userType": req.user_type,
            "createdAt": now,
            "updatedAt": now,
        }, merge=True)

        # Ensure Storage folders
        legacy_placeholder = ensure_user_folder(uid, req.user_type)
        name_folder_paths = ensure_name_folder_with_profile(uid, req.user_type, req.name, email or "")

        return {
            "success": True,
            "uid": uid,
            "userType": req.user_type,
            "storage": {
                "legacy": legacy_placeholder,
                "nameFolder": name_folder_paths,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/verify-token")
def verify_token(req: VerifyTokenRequest):
    """
    Verifies a Firebase ID token from the frontend login.
    Returns decoded token (contains uid and custom claims if present).
    """
    auth = get_auth()
    try:
        decoded = auth.verify_id_token(req.id_token)
        return {"success": True, "decoded": decoded}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
