from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = "HS256"


def create_access_token(data):

    token = jwt.encode(

        data,

        SECRET_KEY,

        algorithm=ALGORITHM

    )

    return token