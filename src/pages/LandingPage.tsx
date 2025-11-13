import { useNavigate } from 'react-router-dom'
import { Mail, Clock, CheckCircle, Sparkles, History, Edit3, Heart } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleStartWriting = () => {
    navigate('/compose')
  }

  const handleViewHistory = () => {
    navigate('/history')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Mail className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-800">时光邮局</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStartWriting}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>写信</span>
              </button>
              <button
                onClick={handleViewHistory}
                className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <History className="w-4 h-4" />
                <span>历史</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="mb-6">
            <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            把此刻的心事，
            <br />
            <span className="text-purple-600">寄给未来的星光</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            时光为邮，成长为信 —— 致 X 年后的你
            <br />
            按下时光暂停键，让未来见证每一步蜕变
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleStartWriting}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>立即执笔，给未来写封信</span>
            </button>
            <button
              onClick={handleViewHistory}
              className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>查看历史信件</span>
            </button>
          </div>
        </div>
      </section>

      {/* 核心价值区域 */}
      <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">为什么选择时光邮局？</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            一封穿越岁月的信，藏着你未完成的期待
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Edit3 className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">定格真实当下</h3>
            <p className="text-gray-600 leading-relaxed">
              不必修饰的情绪、尚未实现的梦想、想说却没说的话，
              此刻落笔，都是时光最珍贵的注脚
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">奔赴已知未来</h3>
            <p className="text-gray-600 leading-relaxed">
              设定专属时间坐标（1年/3年/5年/10年），
              让信件穿越岁月，与未来的自己温柔重逢
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">见证成长轨迹</h3>
            <p className="text-gray-600 leading-relaxed">
              当过往的迷茫遇见后来的坚定，当曾经的期许变成眼前的现实，
              文字为证，你已悄悄发光
            </p>
          </div>
        </div>
      </section>

      {/* 场景化引导区域 */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">写给未来的自己</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">给迷茫的自己一个承诺</h3>
              <p className="text-gray-600">
                现在的你，或许正为生活奔波、为理想执着，写下此刻的状态，
                让未来的自己看看——当初的坚持，是否开花结果
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">给努力的自己一个期许</h3>
              <p className="text-gray-600">
                给老去的自己一份回忆，时光邮局，帮你存档每一份真心
                <br />不必急于答案，不必焦虑未知
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <p className="text-xl leading-relaxed">
              把当下交给文字，让时间慢慢酝酿，终会收到最动人的回响
            </p>
          </div>
        </div>
      </section>

      {/* 行动号召区域 */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">准备好开始了吗？</h2>
          <p className="text-xl mb-8 opacity-90">
            预约时光，赴一场成长之约
            <br />
            解锁专属时光信封，留存此刻温度
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleStartWriting}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>让文字穿越岁月，遇见更好的你</span>
            </button>
          </div>
        </div>
      </section>

      {/* 底部品牌理念 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-6 h-6" />
            <span className="text-xl font-bold">时光邮局</span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            不只是信件的存储者，更是成长的见证者——让每一份真诚，都能在未来被温柔拾起
            <br />
            以时间为邮路，以文字为信物，连接此刻与未来，记录你从未停止的成长
          </p>
          <div className="mt-8 text-sm text-gray-400">
            <p>在这里，每一封信都有归期，每一段成长都有痕迹</p>
          </div>
        </div>
      </footer>
    </div>
  )
}