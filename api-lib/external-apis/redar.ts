import axios, { AxiosError, AxiosInstance } from 'axios'
import config from 'config'

const RadarApi = (instance: AxiosInstance) => ({
    get: (endpoint: string) => instance.get(endpoint),
    post: (endpoint: string, data: any) => instance.post(endpoint, data),
    home: {
        setOfferStatus: (status: string, id: number, date?: Date) =>
            instance.post('/homes/offer/status', { status, id, date }),
    },
    messageBus: {
        alert: (text: string) =>
            instance.post(`/message-bus/notify`, { text, channel: 'alerts' }),
    },
})

const create = () => {
    const axiosInstance = axios.create({
        baseURL: config.services.redar.baseUrl,
        responseType: 'json',
        withCredentials: true,
    })

    return RadarApi(axiosInstance)
}

export async function proxyRequest(
    method: 'POST' | 'GET',
    endpoint: string,
    data?: any,
    user?: any
): Promise<{ status: number; json: any }> {
    try {
        const params = new URLSearchParams(
            method === 'POST'
                ? { userId: user?.id || null }
                : { userId: user?.id || null, ...data }
        ).toString()

        const userEndpoint = user ? `${endpoint}?${params}` : endpoint

        const request = await (method === 'POST'
            ? create().post(
                  userEndpoint,
                  user ? { userId: user?.id || null, ...data } : data
              )
            : create().get(userEndpoint))

        return {
            status: request.status,
            json: request.data,
        }
    } catch (e) {
        if (e instanceof Error && e.hasOwnProperty('toJSON')) {
            const response = e as AxiosError
            const json = response.response?.data
            return {
                status: json.hasOwnProperty('statusCode')
                    ? json.statusCode
                    : 500,
                json,
            }
        } else {
            return {
                status: 500,
                json: {},
            }
        }
    }
}

export default create()
