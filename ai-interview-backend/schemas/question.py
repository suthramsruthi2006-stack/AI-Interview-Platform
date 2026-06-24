from pydantic import BaseModel


class QuestionCreate(BaseModel):

    interview_id: int
    question_text: str


class QuestionResponse(BaseModel):

    id: int
    interview_id: int
    question_text: str
    difficulty: str

    class Config:
        from_attributes = True