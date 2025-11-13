import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Optional

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.from_name = os.getenv("SMTP_FROM_NAME", "时光邮局")
        self.from_email = os.getenv("SMTP_FROM_EMAIL", "noreply@timemail.com")

    def send_time_letter(self, to_email: str, content: str, delivery_time: datetime) -> bool:
        """发送时光邮件"""
        try:
            # 创建邮件内容
            subject = "来自过去的你的信"
            
            # 格式化送达时间
            formatted_time = delivery_time.strftime("%Y年%m月%d日 %H:%M")
            
            # 创建邮件正文
            html_body = f"""
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>来自过去的你的信</title>
                <style>
                    body {{
                        font-family: 'Microsoft YaHei', 'SimSun', serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        padding: 40px;
                    }}
                    .header {{
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #e9ecef;
                        padding-bottom: 20px;
                    }}
                    .header h1 {{
                        color: #2c3e50;
                        font-size: 24px;
                        margin: 0;
                    }}
                    .header .subtitle {{
                        color: #6c757d;
                        font-size: 14px;
                        margin-top: 10px;
                    }}
                    .content {{
                        background-color: #f8f9fa;
                        border-left: 4px solid #007bff;
                        padding: 20px;
                        margin: 30px 0;
                        border-radius: 5px;
                        font-size: 16px;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }}
                    .footer {{
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e9ecef;
                        color: #6c757d;
                        font-size: 12px;
                    }}
                    .timestamp {{
                        background-color: #e3f2fd;
                        padding: 10px;
                        border-radius: 5px;
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 14px;
                        color: #1976d2;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>来自过去的你的信</h1>
                        <div class="subtitle">时光邮局 - 连接过去与未来的桥梁</div>
                    </div>
                    
                    <div class="timestamp">
                        <strong>这封信预定在 {formatted_time} 送达</strong>
                    </div>
                    
                    <div class="content">
{content}
                    </div>
                    
                    <div class="footer">
                        <p>这是一封来自时光邮局的信</p>
                        <p>愿你在未来的每一天都能记得此刻的心情</p>
                    </div>
                </div>
            </body>
            </html>
            """

            # 创建邮件消息
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email

            # 添加HTML内容
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)

            # 连接SMTP服务器并发送邮件
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()  # 启用TLS加密
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)

            print(f"✅ 邮件发送成功: {to_email}")
            return True

        except Exception as e:
            print(f"❌ 邮件发送失败: {str(e)}")
            return False

    def test_connection(self) -> bool:
        """测试邮件服务连接"""
        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                return True
        except Exception as e:
            print(f"邮件服务连接测试失败: {str(e)}")
            return False

# 创建全局邮件服务实例
email_service = EmailService()