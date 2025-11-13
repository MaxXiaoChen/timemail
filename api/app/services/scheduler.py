import os
from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.letter import TimeLetter
from app.services.email_service import email_service

class LetterScheduler:
    def __init__(self):
        self.scheduler = None
        self.interval_minutes = int(os.getenv("SCHEDULER_INTERVAL_MINUTES", "5"))

    def start(self):
        """启动定时任务调度器"""
        if self.scheduler is None:
            self.scheduler = AsyncIOScheduler()
            
            # 添加定时任务：每interval_minutes分钟检查一次待发送的邮件
            self.scheduler.add_job(
                self.send_due_letters,
                trigger=IntervalTrigger(minutes=self.interval_minutes),
                id="send_due_letters",
                name="发送到期时光邮件",
                replace_existing=True
            )
            
            self.scheduler.start()
            print(f"📅 定时任务调度器已启动，每{self.interval_minutes}分钟检查一次")

    def stop(self):
        """停止定时任务调度器"""
        if self.scheduler:
            self.scheduler.shutdown()
            self.scheduler = None
            print("📅 定时任务调度器已停止")

    async def send_due_letters(self):
        """发送所有到期的时光邮件"""
        print(f"⏰ 开始检查到期的时光邮件 - {datetime.now()}")
        
        db = SessionLocal()
        try:
            # 查询所有到期的待发送邮件
            due_letters = db.query(TimeLetter).filter(
                TimeLetter.delivery_time <= datetime.now(),
                TimeLetter.status == 'scheduled'
            ).all()
            
            print(f"📬 发现 {len(due_letters)} 封到期的邮件")
            
            for letter in due_letters:
                try:
                    # 发送邮件
                    success = email_service.send_time_letter(
                        to_email=letter.delivery_email,
                        content=letter.content,
                        delivery_time=letter.delivery_time
                    )
                    
                    if success:
                        # 更新状态为已发送
                        letter.status = 'sent'
                        letter.sent_at = datetime.now()
                        print(f"✅ 邮件发送成功: {letter.id}")
                    else:
                        # 更新状态为发送失败
                        letter.status = 'failed'
                        letter.error_message = "邮件发送失败"
                        print(f"❌ 邮件发送失败: {letter.id}")
                    
                    db.commit()
                    
                except Exception as e:
                    # 发送失败，更新状态
                    letter.status = 'failed'
                    letter.error_message = str(e)
                    db.commit()
                    print(f"❌ 邮件发送异常: {letter.id} - {str(e)}")
                    
        except Exception as e:
            print(f"❌ 查询到期邮件时发生错误: {str(e)}")
        finally:
            db.close()

# 创建全局调度器实例
letter_scheduler = LetterScheduler()

def start_scheduler():
    """启动调度器"""
    letter_scheduler.start()

def stop_scheduler():
    """停止调度器"""
    letter_scheduler.stop()