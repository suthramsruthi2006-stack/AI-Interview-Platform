from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Text
)

from database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )

    candidate_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    job_role_id = Column(
        Integer,
        ForeignKey("job_roles.id"),
        nullable=False
    )

    status = Column(
        String(20),
        default="Started",
        nullable=False
    )

    score = Column(
        Integer,
        default=0,
        nullable=False
    )

    feedback = Column(
        Text,
        nullable=True
    )