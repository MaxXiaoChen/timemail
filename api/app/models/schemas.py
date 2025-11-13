from pydantic import BaseModel, EmailStr, validator
from datetime import datetime
from typing import Optional
from uuid import UUID

class CreateLetterRequest(BaseModel):
    content: str
    delivery_email: EmailStr
    delivery_time: datetime

    @validator('content')
    def validate_content(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('邮件内容至少需要10个字符')
        if len(v) > 2000:
            raise ValueError('邮件内容不能超过2000个字符')
        return v.strip()

    @validator('delivery_time')
    def validate_delivery_time(cls, v):
        from datetime import timezone
        if v <= datetime.now(timezone.utc):
            raise ValueError('送达时间必须是未来的时间')
        return v

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class CreateLetterResponse(BaseModel):
    letter_id: UUID
    status: str
    created_at: datetime

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            UUID: lambda v: str(v)
        }

class LetterSummary(BaseModel):
    id: UUID
    title: str
    delivery_time: datetime
    status: str
    created_at: datetime

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            UUID: lambda v: str(v)
        }

class GetHistoryResponse(BaseModel):
    letters: list[LetterSummary]

class HealthResponse(BaseModel):
    status: str

class ErrorResponse(BaseModel):
    detail: str