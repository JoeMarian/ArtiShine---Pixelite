from fastapi import APIRouter
from ..firebase_config import get_bucket, get_db

router = APIRouter(prefix="/debug", tags=["debug"])


@router.get("/firebase")
def debug_firebase():
    info = {"ok": True}

    # Check Storage
    try:
        bucket = get_bucket()
        info["storage_ok"] = True
        info["bucket"] = bucket.name
        # Attempt a light list to ensure access (prefix none)
        _ = next(bucket.list_blobs(max_results=1), None)
    except Exception as e:
        info["storage_ok"] = False
        info["storage_error"] = str(e)

    # Check Firestore
    try:
        db = get_db()
        # Try to read a (likely non-existent) doc; success means client works
        _ = db.collection("_meta").document("_connectivity").get()
        info["firestore_ok"] = True
    except Exception as e:
        info["firestore_ok"] = False
        info["firestore_error"] = str(e)

    return info
