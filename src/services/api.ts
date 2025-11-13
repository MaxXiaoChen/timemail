const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface CreateLetterRequest {
  content: string
  delivery_email: string
  delivery_time: string
}

export interface CreateLetterResponse {
  letter_id: string
  status: 'scheduled'
  created_at: string
}

export interface Letter {
  id: string
  title: string
  delivery_time: string
  status: 'scheduled' | 'sent' | 'failed'
  created_at: string
}

export interface GetHistoryResponse {
  letters: Letter[]
}

class ApiService {
  private async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('网络请求失败')
    }
  }

  // 创建时光邮件
  async createLetter(data: CreateLetterRequest): Promise<CreateLetterResponse> {
    // 将datetime-local格式转换为ISO格式
    const formattedData = {
      ...data,
      delivery_time: new Date(data.delivery_time).toISOString()
    }
    
    return this.fetchWithErrorHandling<CreateLetterResponse>(
      `${API_BASE_URL}/api/time-letters`,
      {
        method: 'POST',
        body: JSON.stringify(formattedData),
      }
    )
  }

  // 获取历史信件列表
  async getHistory(email: string): Promise<GetHistoryResponse> {
    return this.fetchWithErrorHandling<GetHistoryResponse>(
      `${API_BASE_URL}/api/time-letters/history?email=${encodeURIComponent(email)}`
    )
  }

  // 健康检查
  async healthCheck(): Promise<{ status: string }> {
    return this.fetchWithErrorHandling<{ status: string }>(
      `${API_BASE_URL}/health`
    )
  }
}

export const apiService = new ApiService()