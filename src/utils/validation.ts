export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}

export const validateLengthRange = (value: string, minLength: number, maxLength: number): boolean => {
  const trimmed = value.trim()
  return trimmed.length >= minLength && trimmed.length <= maxLength
}

export const getContentPreview = (content: string, maxLength: number = 100): string => {
  const trimmed = content.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }
  return trimmed.substring(0, maxLength) + '...'
}

export const sanitizeContent = (content: string): string => {
  // 移除多余的空白字符
  return content
    .replace(/\r\n/g, '\n') // 统一换行符
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n') // 限制连续空行最多2个
    .trim()
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export const validateLetterForm = (content: string, email: string, deliveryTime: string): ValidationResult => {
  const errors: ValidationError[] = []

  // 验证内容
  if (!validateRequired(content)) {
    errors.push({ field: 'content', message: '请输入邮件内容' })
  } else if (!validateMinLength(content, 10)) {
    errors.push({ field: 'content', message: '邮件内容至少需要10个字符' })
  } else if (!validateMaxLength(content, 2000)) {
    errors.push({ field: 'content', message: '邮件内容不能超过2000个字符' })
  }

  // 验证邮箱
  if (!validateRequired(email)) {
    errors.push({ field: 'email', message: '请输入邮箱地址' })
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: '请输入有效的邮箱地址' })
  }

  // 验证送达时间
  if (!validateRequired(deliveryTime)) {
    errors.push({ field: 'deliveryTime', message: '请选择送达时间' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}