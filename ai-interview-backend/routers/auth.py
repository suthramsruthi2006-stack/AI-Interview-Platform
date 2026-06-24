from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user import User

from schemas.user import (
    UserCreate,
    UserLogin
)

from utils.hashing import (
    hash_password,
    verify_password
)

from utils.jwt import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    print("========== REGISTER DEBUG ==========")
    print("Name:", user.name)
    print("Email:", user.email)
    print("Password:", user.password)
    print("Password Length:", len(user.password))
    print("===================================")

    if len(user.password) > 72:
        raise HTTPException(
            status_code=400,
            detail=f"Password too long ({len(user.password)} characters). Maximum allowed is 72."
        )

    try:
        hashed_password = hash_password(
            user.password
        )

    except Exception as e:
        print("HASHING ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Password hashing failed: {str(e)}"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    valid_password = verify_password(
        user.password,
        db_user.password
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Wrong Password"
        )

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role
        }
    }


@router.get("/me")
def current_user(
    db: Session = Depends(get_db)
):

    return {
        "message": "Current User Endpoint"
    }