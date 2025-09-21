import os
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app, storage, firestore, auth
from firebase_admin import get_app

# Load environment variables
load_dotenv()

_initialized = False

def init_firebase() -> None:
    global _initialized
    if _initialized:
        return
    try:
        # Will raise ValueError if default app not initialized
        get_app()
        _initialized = True
        return
    except ValueError:
        pass

    cred_path = os.getenv('SERVICE_ACCOUNT_KEY_PATH')
    bucket_name = os.getenv('FIREBASE_STORAGE_BUCKET')
    if not cred_path or not os.path.exists(cred_path):
        raise RuntimeError('SERVICE_ACCOUNT_KEY_PATH missing or file not found')
    if not bucket_name:
        raise RuntimeError('FIREBASE_STORAGE_BUCKET not set')

    cred = credentials.Certificate(cred_path)
    initialize_app(cred, {
        'storageBucket': bucket_name
    })
    _initialized = True


def get_db():
    init_firebase()
    return firestore.client()


def get_bucket():
    init_firebase()
    return storage.bucket()


def get_auth():
    init_firebase()
    return auth
