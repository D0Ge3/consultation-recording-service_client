import { setError } from '../appActions'

export const catchNetworkError = (error, dispatch) => {
  if (error.response) {
    dispatch(setError('Ошибка сервера!'))
  } else if (error.request) {
    dispatch(setError('Проблемы с соединением!'))
  }
}
