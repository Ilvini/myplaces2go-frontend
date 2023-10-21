import useSWR from 'swr'
import { api } from './axios'

export function useFetch<T>(url: string, token?: string) {
  const { data, error, isLoading } = useSWR<T>(url, async (url) => {
    const response = await api.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'Bearer ' + token,
      },
    })
    return response.data
  })

  return { data, error, isLoading }
}

