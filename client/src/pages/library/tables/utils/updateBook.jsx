import React from 'react';

import {updateBookHandler} from '@src/http/booksAPI'

export const updateBook = async (id, book) => {
  try {
    const response = await updateBookHandler(id, book)
    return response
  } catch (error) {
    throw error
  }
};