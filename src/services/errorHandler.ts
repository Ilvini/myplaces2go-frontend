import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

export function errorHandler(error: any) {
  if (error?.response?.status === 403) {
    toast.error('Senha ou Email Incorretos')
    return
  }
  if (error?.response?.status === 401) {
    toast.error('Sessão expirada, faça login novamente')
    Cookies.remove('token')
    return (window.location.href = '/login')
  }
  if (error?.response?.status === 500) {
    toast.error('Ocorreu um erro no servidor, tente novamente mais tarde')
    return
  }
  try {
    toast.error(error?.response?.data.message)
  } catch (error) {
    toast.error('Ocorreu um erro no servidor, tente novamente mais tarde')
  }
}

