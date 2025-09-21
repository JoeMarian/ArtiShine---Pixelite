def build_user_path(user_id: str, user_type: str) -> str:
    base = "artisans" if user_type == "artisan" else "buyers"
    return f"{base}/{user_id}"
