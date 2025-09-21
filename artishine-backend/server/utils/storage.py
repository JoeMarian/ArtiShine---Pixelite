import json
import re
import time
from typing import Optional
from google.cloud.storage.blob import Blob
from .paths import build_user_path
from ..firebase_config import get_bucket


def _slugify_name(name: str) -> str:
    # Keep letters, numbers, spaces, dashes, underscores; collapse spaces to single dash
    cleaned = re.sub(r"[^\w\-\s]", "", name).strip()
    cleaned = re.sub(r"\s+", "-", cleaned)
    return cleaned or "user"


def upload_file_for_user(
    file_bytes: bytes,
    filename: str,
    user_id: str,
    user_type: str,
    content_type: Optional[str] = None,
) -> str:
    """
    Upload a file to Firebase Storage under artisans/{uid}/ or buyers/{uid}/.
    Returns a gs:// URL path to the uploaded file.
    """
    bucket = get_bucket()
    safe_name = filename.replace(" ", "_")
    ts = int(time.time())
    blob_path = f"{build_user_path(user_id, user_type)}/{ts}_{safe_name}"
    blob: Blob = bucket.blob(blob_path)
    blob.upload_from_string(file_bytes, content_type=content_type)
    return f"gs://{bucket.name}/{blob_path}"


def ensure_user_folder(user_id: str, user_type: str) -> str:
    """
    Legacy: ensure a UID-based folder exists by uploading a tiny placeholder file.
    Returns the gs:// path to the placeholder.
    """
    bucket = get_bucket()
    base_path = build_user_path(user_id, user_type)
    placeholder_path = f"{base_path}/.init"
    blob: Blob = bucket.blob(placeholder_path)
    if not blob.exists():
        blob.upload_from_string(b"initialized", content_type="text/plain")
    return f"gs://{bucket.name}/{placeholder_path}"


def ensure_name_folder_with_profile(user_id: str, user_type: str, display_name: str, email: str) -> dict:
    """
    Create a name-based folder under artisans/ or buyers/ and write a profile.json.
    We DO NOT store plaintext password. Firebase Auth manages credentials securely.
    Returns a dict with paths used.
    """
    bucket = get_bucket()
    name_folder = _slugify_name(display_name)
    base_prefix = "artisans" if user_type == "artisan" else "buyers"
    folder_path = f"{base_prefix}/{display_name}"  # keep display name as requested (may include spaces)

    # Create a hidden .init file to ensure folder visibility
    init_blob = bucket.blob(f"{folder_path}/.init")
    if not init_blob.exists():
        init_blob.upload_from_string(b"initialized", content_type="text/plain")

    # Write profile.json (no password)
    profile = {
        "uid": user_id,
        "name": display_name,
        "email": email,
        "userType": user_type,
        "createdAt": int(time.time()),
    }
    profile_blob = bucket.blob(f"{folder_path}/profile.json")
    profile_blob.upload_from_string(json.dumps(profile, ensure_ascii=False, indent=2), content_type="application/json")

    return {
        "folder": f"gs://{bucket.name}/{folder_path}",
        "profile": f"gs://{bucket.name}/{folder_path}/profile.json",
    }
