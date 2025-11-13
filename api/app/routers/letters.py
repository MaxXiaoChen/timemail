from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.letter import TimeLetter
from app.models.schemas import (
    CreateLetterRequest, 
    CreateLetterResponse, 
    GetHistoryResponse,
    LetterSummary,
    ErrorResponse
)
from app.services.email_service import EmailService

router = APIRouter()

@router.post("/", response_model=CreateLetterResponse)
async def create_letter(
    letter_data: CreateLetterRequest,
    db: Session = Depends(get_db)
):
    """创建时光邮件"""
    try:
        # 创建新的时光邮件
        new_letter = TimeLetter(
            content=letter_data.content,
            delivery_email=letter_data.delivery_email,
            delivery_time=letter_data.delivery_time,
            status='scheduled'
        )
        
        db.add(new_letter)
        db.commit()
        db.refresh(new_letter)
        
        return CreateLetterResponse(
            letter_id=new_letter.id,
            status=new_letter.status,
            created_at=new_letter.created_at
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"创建邮件失败: {str(e)}")

@router.get("/history", response_model=GetHistoryResponse)
async def get_history(
    email: str = Query(..., description="用户邮箱地址"),
    db: Session = Depends(get_db)
):
    """获取用户的历史信件列表"""
    try:
        # 验证邮箱格式
        if not email or '@' not in email:
            raise HTTPException(status_code=400, detail="无效的邮箱地址")
        
        # 查询用户的信件历史
        letters = db.query(TimeLetter).filter(
            TimeLetter.delivery_email == email
        ).order_by(TimeLetter.created_at.desc()).all()
        
        # 转换为响应格式
        letter_summaries = []
        for letter in letters:
            letter_summaries.append(LetterSummary(
                id=letter.id,
                title=letter.get_title(),
                delivery_time=letter.delivery_time,
                status=letter.status,
                created_at=letter.created_at
            ))
        
        return GetHistoryResponse(letters=letter_summaries)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"查询历史记录失败: {str(e)}")

@router.get("/{letter_id}")
async def get_letter(
    letter_id: str,
    db: Session = Depends(get_db)
):
    """获取单个邮件详情"""
    try:
        from uuid import UUID
        letter_uuid = UUID(letter_id)
        
        letter = db.query(TimeLetter).filter(TimeLetter.id == letter_uuid).first()
        
        if not letter:
            raise HTTPException(status_code=404, detail="邮件未找到")
        
        return letter.to_dict()
        
    except ValueError:
        raise HTTPException(status_code=400, detail="无效的邮件ID格式")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取邮件详情失败: {str(e)}")