from pydantic import BaseModel
from typing import Optional


class ResumeBase(BaseModel):
    file_name: str


class ResumeResponse(ResumeBase):

    id: int
    user_id: int
    extracted_text: Optional[str]

    class Config:
        from_attributes = True