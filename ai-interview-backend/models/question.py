from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from database import Base


class Question(Base):

    __tablename__ = "questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    interview_id = Column(
        Integer,
        ForeignKey("interviews.id")
    )

    question_text = Column(
        String,
        nullable=False
    )

    difficulty = Column(
        String(20),
        default="medium"
    )