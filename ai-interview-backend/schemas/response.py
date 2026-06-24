from pydantic import BaseModel
from typing import Optional


class ResponseCreate(BaseModel):

    question_id: int
    answer: str


class ResponseResult(BaseModel):

    id: int
    question_id: int

    answer: str
    score: int

    feedback: Optional[str]

    class Config:
        from_attributes = True