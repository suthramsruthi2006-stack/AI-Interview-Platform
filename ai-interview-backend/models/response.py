from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey
)

from database import Base


class Response(Base):

    __tablename__ = "responses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    question_id = Column(
        Integer,
        ForeignKey("questions.id")
    )

    answer = Column(
        Text,
        nullable=False
    )

    score = Column(
        Integer,
        default=0
    )

    feedback = Column(
        Text
    )