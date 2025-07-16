from sqlalchemy import Column, Integer, String, Float, DateTime, func
from sqlalchemy.types import TIMESTAMP
from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

class Crop(Base):
    __tablename__ = "recommendation_fields"

    id = Column(Integer, primary_key=True, index=True)
    fieldname = Column(String, index=True)
    width = Column(Float)
    height = Column(Float)
    length = Column(Float)
    location = Column(String)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())