import { useEffect, useState } from "react"

type FetchResult<T> = {
  loading: boolean
  error: Error | null
  data: T | null
}

/**
 * Generic fetch hook
 * - T: the shape of the `data` returned (use the backend response shape or `any`)
 *
 * Usage:
 *   const { loading, error, data } = useFetch<MyDataType>('/api/endpoint')
 */
function useFetch<T = any>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`)
        }
        const json = await res.json()

        // Many APIs wrap payload in { data: ... } — prefer that if present,
        // otherwise fall back to the whole JSON body cast to T.
        const payload: T | null = (json && (json.data ?? json)) as T

        if (isMounted) {
          setData(payload)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return { loading, error, data }
}

export default useFetch
