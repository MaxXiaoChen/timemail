import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Clock, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { apiService } from '../services/api'

export default function ComposePage() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [deliveryEmail, setDeliveryEmail] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateFutureTime = (time: string) => {
    const selectedTime = new Date(time)
    const now = new Date()
    return selectedTime > now
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('请输入邮件内容')
      return
    }

    if (!deliveryEmail.trim()) {
      toast.error('请输入邮箱地址')
      return
    }

    if (!validateEmail(deliveryEmail)) {
      toast.error('请输入有效的邮箱地址')
      return
    }

    if (!deliveryTime) {
      toast.error('请选择送达时间')
      return
    }

    if (!validateFutureTime(deliveryTime)) {
      toast.error('送达时间必须是未来的时间')
      return
    }

    setIsSubmitting(true)

    try {
      // 使用API服务创建邮件
      const data = await apiService.createLetter({
        content: content.trim(),
        delivery_email: deliveryEmail.trim(),
        delivery_time: deliveryTime,
      })
      
      // 导航到确认页面，传递邮件数据
      navigate('/confirm', { 
        state: { 
          letterId: data.letter_id,
          content: content.trim(),
          deliveryEmail: deliveryEmail.trim(),
          deliveryTime 
        } 
      })
    } catch (error) {
      toast.error('创建邮件失败，请稍后重试')
      console.error('Error creating letter:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMinDateTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 5) // 最少5分钟后
    return now.toISOString().slice(0, 16)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首页
          </button>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            写给未来的自己
          </h1>
          <p className="text-lg text-gray-600">
            记录下此刻的想法，让未来的自己收到这份珍贵的回忆
          </p>
        </div>

        {/* 邮件表单 */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {/* 邮件内容 */}
            <div className="mb-8">
              <label htmlFor="content" className="block text-lg font-semibold text-gray-800 mb-4">
                想对自己说的话
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="亲爱的未来的我，

希望你还记得今天的心情...

写下你想对未来说的话，可以是：
- 此刻的感受和想法
- 对未来的期望和目标
- 想提醒自己的事情
- 任何你想保存的回忆"
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none transition-colors duration-200"
                required
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {content.length}/2000 字符
              </div>
            </div>

            {/* 送达时间 */}
            <div className="mb-8">
              <label htmlFor="deliveryTime" className="block text-lg font-semibold text-gray-800 mb-4">
                <Clock className="w-5 h-5 inline mr-2" />
                选择送达时间
              </label>
              <input
                type="datetime-local"
                id="deliveryTime"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                min={getMinDateTime()}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                请选择未来的时间，最少5分钟后
              </p>
            </div>

            {/* 邮箱地址 */}
            <div className="mb-8">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-4">
                <Mail className="w-5 h-5 inline mr-2" />
                接收邮箱
              </label>
              <input
                type="email"
                id="email"
                value={deliveryEmail}
                onChange={(e) => setDeliveryEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                请确保邮箱地址正确，邮件将发送到此邮箱
              </p>
            </div>

            {/* 提交按钮 */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg disabled:cursor-not-allowed"
              >
                {isSubmitting ? '创建中...' : '创建时光邮件'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}