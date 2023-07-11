import toast from 'react-hot-toast'

export function successHandler(response: any) {
  try {
    toast.success(response.data.message)
  } catch (error) {
    toast.success('Solicitação realizada com sucesso')
  }
}
