from pydantic import BaseModel
from typing import Optional


class JobRoleBase(BaseModel):

    title: str
    description: Optional[str]
    required_skills: Optional[str]
    experience_level: Optional[str]


class JobRoleCreate(JobRoleBase):
    pass


class JobRoleResponse(JobRoleBase):

    id: int

    class Config:
        from_attributes = True