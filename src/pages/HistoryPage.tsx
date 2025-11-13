import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Clock, CheckCircle, XCircle, Clock3, Home, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { apiService } from '../services/api'
import { toast } from 'sonner'

interface Letter {
  id: string
  title: string
  delivery_time: string
  status: 'scheduled' | 'sent' | 'failed'
  created_at: string
}

type FilterStatus = 'all' | 'scheduled' | 'sent' | 'failed'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [letters, setLetters] = useState<Letter[]>([])
  const [filteredLetters, setFilteredLetters] = useState<Letter[]>([])
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 模拟数据 - 后续会从API获取
  const mockLetters: Letter[] = [
    {
      id: '1',
      title: '亲爱的未来的我，希望你还记得今天的心情...',
      delivery_time: '2024-12-31T10:00:00Z',
      status: 'scheduled',
      created_at: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      title: '给一年后的自己的一封信...',
      delivery_time: '2024-11-15T09:00:00Z',
      status: 'sent',
      created_at: '2024-01-10T16:45:00Z'
    },
    {
      id: '3',
      title: '关于梦想和目标的思考...',
      delivery_time: '2024-10-20T20:00:00Z',
      status: 'failed',
      created_at: '2024-01-05T11:20:00Z'
    }
  ]

  useEffect(() => {
    // 从localStorage获取用户邮箱
    const savedEmail = localStorage.getItem('userEmail') || ''
    setEmail(savedEmail)
    
    // 模拟加载历史数据
    loadHistory(savedEmail)
  }, [])

  useEffect(() => {
    // 根据筛选条件过滤信件
    if (filterStatus === 'all') {
      setFilteredLetters(letters)
    } else {
      setFilteredLetters(letters.filter(letter => letter.status === filterStatus))
    }
  }, [letters, filterStatus])

  const loadHistory = async (userEmail: string) => {
    if (!userEmail.trim()) {
      setLetters([])
      return
    }

    setIsLoading(true)
    try {
      // 调用真实的API获取历史邮件
      const data = await apiService.getHistory(userEmail)
      setLetters(data.letters)
    } catch (error) {
      console.error('Failed to load history:', error)
      toast.error('加载历史记录失败，请稍后重试')
      setLetters([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      localStorage.setItem('userEmail', email.trim())
      loadHistory(email.trim())
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock3 className="w-5 h-5 text-blue-600" />
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Mail className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '待发送'
      case 'sent':
        return '已发送'
      case 'failed':
        return '发送失败'
      default:
        return '未知'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (timeString: string) => {
    try {
      return format(new Date(timeString), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })
    } catch {
      return timeString
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首页
          </button>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            历史记录
          </h1>
          <p className="text-lg text-gray-600">
            查看你寄出的所有时光邮件
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 邮箱输入 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleEmailSubmit}>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-4">
                输入你的邮箱查看历史记录
              </label>
              <div className="flex gap-4">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isLoading ? '查询中...' : '查询'}
                </button>
              </div>
            </form>
          </div>

          {/* 状态筛选 */}
          {letters.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: '全部' },
                  { key: 'scheduled', label: '待发送' },
                  { key: 'sent', label: '已发送' },
                  { key: 'failed', label: '发送失败' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key as FilterStatus)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      filterStatus === key
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 信件列表 */}
          <div className="space-y-4">
            {filteredLetters.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {email ? '暂无邮件记录' : '请输入邮箱查看历史记录'}
                </h3>
                <p className="text-gray-500">
                  {email ? '你还没有寄出任何时光邮件' : '输入邮箱地址开始查询你的历史邮件'}
                </p>
              </div>
            ) : (
              filteredLetters.map((letter) => (
                <div key={letter.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {letter.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>创建时间: {formatDateTime(letter.created_at)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          <span>送达时间: {formatDateTime(letter.delivery_time)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      {getStatusIcon(letter.status)}
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(letter.status)}`}>
                        {getStatusText(letter.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 底部导航 */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                返回首页
              </button>
              
              <button
                onClick={() => navigate('/compose')}
                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                创建新邮件
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}