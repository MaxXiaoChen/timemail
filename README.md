# 时光邮局 (TimeMail)

一个让用户给未来的自己写信的Web应用。用户可以在页面留下想对自己说的话，设置未来的收信时间，系统会在指定时间自动发送邮件给用户。

## 🌟 功能特点

- ✍️ **写信功能**：简洁的文本编辑器，支持多行文本输入
- ⏰ **定时发送**：设置未来的收信时间，精确到分钟
- 📧 **自动投递**：系统会在指定时间自动发送邮件
- 📚 **历史记录**：查看所有寄出的历史信件和状态
- 🔒 **隐私保护**：只显示信件标题，不显示正文内容
- 📱 **响应式设计**：适配桌面端、平板和移动端

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router DOM
- **状态管理**: Zustand
- **UI组件**: Lucide React (图标)
- **通知**: Sonner (Toast)

### 后端
- **框架**: FastAPI (Python 3.12)
- **数据库**: PostgreSQL (开发环境使用SQLite)
- **ORM**: SQLAlchemy 2.0
- **定时任务**: APScheduler
- **邮件服务**: SMTP (smtplib)

## 🚀 快速开始

### 环境要求
- Node.js 18+ 和 pnpm
- Python 3.12+
- PostgreSQL 15+ (可选，开发环境可用SQLite)

### 安装依赖

1. **克隆项目**
```bash
git clone <repository-url>
cd timemail
```

2. **安装前端依赖**
```bash
pnpm install
```

3. **安装后端依赖**
```bash
cd api
pip install -r requirements.txt
```

### 配置环境变量

1. **前端配置** (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=时光邮局
VITE_APP_VERSION=1.0.0
```

2. **后端配置** (`api/.env`)
```env
# 数据库配置
DATABASE_URL=sqlite:///./timemail.db  # 开发环境
# DATABASE_URL=postgresql://user:password@localhost:5432/timemail  # 生产环境

# 邮件服务配置 (需要真实的SMTP服务)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_NAME=时光邮局
SMTP_FROM_EMAIL=noreply@timemail.com

# API配置
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# 定时任务配置
SCHEDULER_INTERVAL_MINUTES=5
```

### 启动应用

#### 开发模式 (推荐)
```bash
# 启动前端和后端（同时运行）
pnpm fullstack
```

#### 单独启动
```bash
# 启动前端
pnpm dev

# 启动后端（在api目录下）
cd api
python main.py
# 或者
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 访问应用

- **前端应用**: http://localhost:5173
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs

## 📖 API文档

### 创建时光邮件
```http
POST /api/time-letters
Content-Type: application/json

{
  "content": "亲爱的未来的我，希望你还记得今天的心情...",
  "delivery_email": "user@example.com",
  "delivery_time": "2024-12-31T10:00:00Z"
}
```

### 获取历史记录
```http
GET /api/time-letters/history?email=user@example.com
```

## 🧪 测试

### 前端测试
```bash
pnpm run test
```

### 后端测试
```bash
cd api
pytest
```

## 🚀 部署

### 前端部署
1. 构建生产版本
```bash
pnpm build
```

2. 部署到静态托管服务 (Vercel, Netlify, 等)

### 后端部署
1. 配置生产环境变量
2. 使用Docker或云服务部署
3. 配置PostgreSQL数据库
4. 配置真实的SMTP邮件服务

## 📁 项目结构

```
timemail/
├── src/                    # 前端源代码
│   ├── components/         # 可复用组件
│   ├── pages/              # 页面组件
│   ├── services/           # API服务
│   ├── store/              # 状态管理
│   ├── utils/              # 工具函数
│   └── router.tsx          # 路由配置
├── api/                    # 后端源代码
│   ├── app/                # 应用代码
│   │   ├── models/         # 数据模型
│   │   ├── routers/        # API路由
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   ├── migrations/         # 数据库迁移
│   └── main.py             # 应用入口
├── public/                 # 静态资源
├── package.json            # 前端依赖
├── requirements.txt        # 后端依赖
└── README.md              # 项目文档
```

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 感谢所有为开源社区贡献的项目和工具
- 特别感谢React、FastAPI、Tailwind CSS等优秀框架

---

💌 **时光邮局** - 连接过去与未来的桥梁，让每一封信都成为珍贵的回忆。