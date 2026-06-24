from sqlalchemy import Column, Integer, String, Text
from database import Base

class JobRole(Base):

    __tablename__ = "job_roles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    description = Column(
        Text
    )

    required_skills = Column(
        Text
    )

    experience_level = Column(
        String(50)
    )