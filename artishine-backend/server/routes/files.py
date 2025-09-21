from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ..utils.storage import upload_file_for_user

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/upload")
async def upload_user_file(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    user_type: str = Form(...),  # 'artisan' or 'buyer'
):
    try:
        content = await file.read()
        url = upload_file_for_user(
            file_bytes=content,
            filename=file.filename,
            user_id=user_id,
            user_type=user_type,
            content_type=file.content_type,
        )
        return {"success": True, "path": url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
