import { protectedApi, publicApi } from '@/lib/axios'

/**
 * Cria uma novo usuário
 * @param {Object} input - Usuário a ser criado.
 * @param {Object} input.firstName - Primeiro nome do usuário.
 * @param {Object} input.lastName - Último nome do usuário.
 * @param {Object} input.email - Email do usuário.
 * @param {Object} input.password - Senha do usuário.
 * @returns {Object} Usuário criado.
 * @returns {string} response.tokens
 *
 */

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    }
  },
  /**
   * Retornar o balanço
   * @param {Object} input - Usuário a ser criado.
   * @param {Object} input.from - Data inicial (YYYY-MM-DD)
   * @param {Object} input.to - Data final (YYYY-MM-DD)
   *
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
