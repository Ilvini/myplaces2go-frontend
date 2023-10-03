export type Requestify<T> = {
  data: {
    error: boolean
    message: string
    results: T
  }
}

