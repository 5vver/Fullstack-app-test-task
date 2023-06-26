import { $host } from './index.jsx';

export const fetchBooksHandler = async (limit, page) => {
  if (limit && page) {
    const {data} = await $host.get(`api/books?limit=${limit}&page=${page}`)
    return data
  }
  const {data} = await $host.get('api/books')
  return data
}

export const fetchBooksWithAuthorsHandler = async (limit, page) => {
  try {
    if (limit && page) {
      const {data} = await $host.get(`api/books/booksWithAuthors?limit=${limit}&page=${page}`)
      return data
    }
    const {data} = await $host.get('api/books/booksWithAuthors')
    return data
  }
  catch (error) {
    if (error.response.status === 404) {
      return { rows: [], count: 0 };
    } else {
      throw error;
    }
  }
}

export const createBookHandler = async (book) => {
  try {
    const response = await $host.post('api/books', {...book})
    return response
  }
  catch (error) {
    throw error
  }
}

export const updateBookHandler = async (id, book) => {
  try {
    const response = await $host.put(`api/books/${id}`, {...book})
    return response
  }
  catch (error) {
    throw error
  }
}

export const deleteBookHandler = async (id) => {
  try {
    const response = await $host.delete(`api/books/${id}`)
    return response
  }
  catch (error) {
    throw error
  }
}