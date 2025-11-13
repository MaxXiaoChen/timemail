import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Mail, Clock, ArrowLeft, Plus, Home, History } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface LocationState {
  letterId?: string
  content: string
  deliveryEmail: string
  deliveryTime: string
}

export default function ConfirmPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState

  // 如果没有状态数据，返回到首页
  if (!state || !state.content) {
    navigate('/')
    return null
  }

  const { content, deliveryEmail, deliveryTime } = state

  const formatDeliveryTime = (timeString: string) => {
    try {
      return format(new Date(timeString), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })
    } catch {
      return timeString
    }
  }

  const getContentPreview = (content: string) => {
    const maxLength = 100
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* 成功提示区域 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              邮件已创建成功！
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              你的时光邮件将在指定时间自动发送到邮箱
            </p>
          </div>

          {/* 邮件预览 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-orange-600" />
              邮件预览
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">邮件内容</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                  {getContentPreview(content)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    接收邮箱
                  </h3>
                  <p className="text-gray-800 font-medium">{deliveryEmail}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    送达时间
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {formatDeliveryTime(deliveryTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 继续操作 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              接下来做什么？
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <Home className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mb-2" />
                <span className="text-gray-700 group-hover:text-blue-600 font-medium">返回首页</span>
              </button>
              
              <button
                onClick={() => navigate('/compose')}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
              >
                <Plus className="w-8 h-8 text-gray-600 group-hover:text-orange-600 mb-2" />
                <span className="text-gray-700 group-hover:text-orange-600 font-medium">创建新邮件</span>
              </button>
              
              <button
                onClick={() => navigate('/history')}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
              >
                <History className="w-8 h-8 text-gray-600 group-hover:text-green-600 mb-2" />
                <span className="text-gray-700 group-hover:text-green-600 font-medium">查看历史</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}