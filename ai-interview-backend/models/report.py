from sqlalchemy import Column, Integer, String, Text
from database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    role = Column(String(100))

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    overall_score = Column(Integer)

    feedback = Column(Text)