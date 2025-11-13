import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return format(date, 'yyyy年MM月dd日 HH:mm', { locale: zhCN })
  } catch {
    return dateString
  }
}

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return format(date, 'yyyy年MM月dd日', { locale: zhCN })
  } catch {
    return dateString
  }
}

export const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return format(date, 'HH:mm', { locale: zhCN })
  } catch {
    return dateString
  }
}

export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: zhCN 
    })
  } catch {
    return dateString
  }
}

export const isFutureDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString)
    return isValid(date) && date > new Date()
  } catch {
    return false
  }
}

export const getMinDateTime = (): string => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 5) // 最少5分钟后
  return now.toISOString().slice(0, 16)
}

export const validateDeliveryTime = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString)
    const now = new Date()
    now.setMinutes(now.getMinutes() + 5) // 最少5分钟后
    return isValid(date) && date >= now
  } catch {
    return false
  }
}