import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routers import letters
from app.database import engine, Base
from app.services.scheduler import start_scheduler, stop_scheduler

# 加载环境变量
load_dotenv()

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建FastAPI应用
app = FastAPI(
    title="时光邮局 API",
    description="给未来的自己写信的API服务",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # 前端开发服务器
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(letters.router, prefix="/api/time-letters", tags=["时光邮件"])

@app.get("/")
async def root():
    return {
        "message": "欢迎使用时光邮局 API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# 应用启动和关闭事件
@app.on_event("startup")
async def startup_event():
    """应用启动时执行"""
    print("🚀 时光邮局 API 启动中...")
    start_scheduler()
    print("✅ 定时任务已启动")

@app.on_event("shutdown")
async def shutdown_event():
    """应用关闭时执行"""
    print("🛑 时光邮局 API 关闭中...")
    stop_scheduler()
    print("✅ 定时任务已停止")

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", "8000"))
    reload = os.getenv("API_RELOAD", "true").lower() == "true"
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=reload
    )