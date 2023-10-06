import useSWR from 'swr'
import { api } from './axios'

export function useFetch<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(url, async (url) => {
    const response = await api.get(url)
    return response.data
  })

  return { data, error, isLoading }
}

