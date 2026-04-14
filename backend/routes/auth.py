from fastapi import APIRouter
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from database import users_collection
import os
from dotenv import load_dotenv
from database import users_collection, profiles_collection


load_dotenv()   # 👈 load .env

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")   # ✅ from .env
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserSignup(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

def hash_password(password):
    return pwd_context.hash(password[:72])


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def create_token(data: dict):
    data["exp"] = datetime.utcnow() + timedelta(days=7)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/signup")
def signup(user: UserSignup):
    if users_collection.find_one({"email": user.email}):
        return {"error": "User already exists"}

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    users_collection.insert_one(new_user)

    token = create_token({"email": user.email})

    return {"token": token}


@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})

    if not db_user or not verify_password(user.password, db_user["password"]):
        return {"error": "Invalid credentials"}

    token = create_token({"email": user.email})

    return {
    "token": token,
    "name": db_user["name"],
    "email": db_user["email"]
}

from fastapi import Header

# SAVE PROFILE
@router.post("/save-profile")
def save_profile(conditions: list[str], authorization: str = Header(None)):
    token = authorization.split(" ")[1]
    data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    email = data["email"]

    profiles_collection.update_one(
        {"email": email},
        {"$set": {"conditions": conditions}},
        upsert=True
    )

    return {"message": "Profile saved"}


# GET PROFILE
@router.get("/get-profile")
def get_profile(authorization: str = Header(None)):
    token = authorization.split(" ")[1]
    data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    email = data["email"]

    profile = profiles_collection.find_one({"email": email})

    return {
        "conditions": profile["conditions"] if profile else []
    }