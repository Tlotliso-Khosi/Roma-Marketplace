from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CropBase(BaseModel):
    fieldname: str
    width: float
    height: float
    length: float
    location: str

class CropCreate(CropBase):
    pass

class Crop(CropBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str  # matched to 'email'
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
