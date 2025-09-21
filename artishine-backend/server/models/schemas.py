from pydantic import BaseModel, EmailStr, Field
from typing import Literal

UserType = Literal["artisan", "buyer"]

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str
    user_type: UserType

class VerifyTokenRequest(BaseModel):
    id_token: str  # Firebase ID token from frontend
