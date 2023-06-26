import React from 'react';

import {deleteBookHandler} from '@src/http/booksAPI'

export const deleteBook = async (id) => {
  try {
    const response = await deleteBookHandler(id)
    return response
  } catch (error) {
    throw error
  }
};