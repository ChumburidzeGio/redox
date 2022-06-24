import { AxiosError } from 'axios'

export function handleAxiosError(endpoint: string, error: unknown) {
    const axiosError = error as AxiosError
    let message = axiosError.message || ''

    console.log(endpoint, message)
}
