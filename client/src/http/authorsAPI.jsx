import { $host } from './index.jsx';

export const fetchAuthorsHandler = async (limit, page) => {
  if (limit && page) {
    try {
      const {data} = await $host.get(`api/authors?limit=${limit}&page=${page}`)
      return data
    }
    catch (error) {
      throw error
    }
  }
  const {data} = await $host.get('api/authors')
  return data
}

export const checkAuthorHandler = async (id) => {
  try {
    const exists = await $host.get(`api/authors/validation/${id}`)
    return exists
  }
  catch (error) {
    throw error
  }
}