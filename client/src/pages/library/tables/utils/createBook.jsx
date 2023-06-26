import React from 'react';

import {createBookHandler} from '@src/http/booksAPI'

export const createBook = async (book) => {
  try {
    const response = await createBookHandler(book)
    return response
  } catch (error) {
    throw error
  }
};