/**
 * Service API pour gérer les appels backend
 * Usage: CallBackend.get('/endpoint'), CallBackend.post('/endpoint', data), etc.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  /**
   * Méthode générique pour faire des requêtes
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} options - Les options de la requête (method, body, headers, etc.)
   * @returns {Promise} La réponse de l'API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    // Ajouter le token d'authentification si présent
    const token = this.getToken()
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      // Gérer les réponses non-JSON (comme les images, fichiers, etc.)
      const contentType = response.headers.get('content-type')
      let data
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  /**
   * GET request
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} params - Les paramètres de requête (seront convertis en query string)
   * @returns {Promise}
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.request(url, {
      method: 'GET',
    })
  }

  /**
   * POST request
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} data - Les données à envoyer
   * @returns {Promise}
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} data - Les données à envoyer
   * @returns {Promise}
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * PATCH request
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} data - Les données à envoyer
   * @returns {Promise}
   */
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   * @param {string} endpoint - L'endpoint de l'API
   * @returns {Promise}
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }

  /**
   * Récupère le token d'authentification depuis le localStorage
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('auth_token')
  }

  /**
   * Définit le token d'authentification
   * @param {string} token - Le token à stocker
   */
  setToken(token) {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }
}

// Export d'une instance unique du service
const CallBackend = new ApiService(API_BASE_URL)

export default CallBackend

