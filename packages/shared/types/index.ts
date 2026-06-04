export interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  message: string
}
