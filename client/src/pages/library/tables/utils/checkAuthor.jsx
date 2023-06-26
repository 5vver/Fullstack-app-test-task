import {checkAuthorHandler} from '@src/http/authorsAPI.jsx'

export const checkAuthor = async (id) => {
  const response = await checkAuthorHandler(id)
  return response.data[0]['exists']
}