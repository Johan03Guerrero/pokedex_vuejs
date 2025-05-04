import axios from 'axios'

export class HttpService {
  private _axios

  constructor(baseURL: string) {
    this._axios = this.createAxiosInstance(baseURL)
  }

  private createAxiosInstance(baseURL: string) {
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async get<T>(endpoint: string, params = {}): Promise<T> {
    try {
      const response = await this._axios.get(endpoint, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this._axios.post(endpoint, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this._axios.put(endpoint, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this._axios.patch(endpoint, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this._axios.delete(endpoint)
      return response.data
    } catch (error) {
      throw error
    }
  }
} 