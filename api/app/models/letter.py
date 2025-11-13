from sqlalchemy import Column, String, Text, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from datetime import datetime

from app.database import Base

class TimeLetter(Base):
    __tablename__ = "time_letters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    delivery_email = Column(String(255), nullable=False)
    delivery_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(SQLEnum('scheduled', 'sent', 'failed', name='letter_status'), default='scheduled', nullable=False)
    sent_at = Column(DateTime(timezone=True), nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<TimeLetter(id={self.id}, email={self.delivery_email}, status={self.status})>"

    def to_dict(self):
        return {
            "id": str(self.id),
            "content": self.content,
            "delivery_email": self.delivery_email,
            "delivery_time": self.delivery_time.isoformat() if self.delivery_time else None,
            "status": self.status,
            "sent_at": self.sent_at.isoformat() if self.sent_at else None,
            "error_message": self.error_message,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def get_title(self):
        """获取信件标题（内容摘要）"""
        content = self.content.strip()
        if len(content) <= 50:
            return content
        return content[:47] + "..."