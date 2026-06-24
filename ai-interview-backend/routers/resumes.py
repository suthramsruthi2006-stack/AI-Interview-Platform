from fastapi import APIRouter
from fastapi import UploadFile,File

from ai_services.resume_parser import *

import shutil
import os

router = APIRouter(

prefix="/resume",

tags=["Resume"]

)


@router.post("/upload")

async def upload_resume(

file:UploadFile=File(...)

):

    os.makedirs(

    "uploads",

    exist_ok=True

    )

    path=f"uploads/{file.filename}"


    with open(

    path,

    "wb"

    ) as buffer:

        shutil.copyfileobj(

        file.file,

        buffer

        )


    text = extract_resume_text(

    path

    )


    result = extract_resume_data(

    text

    )


    return result