import axios, { AxiosError, AxiosInstance } from 'axios'
import config from 'config'

interface SignInProps {
    email: string
    password: string
}

interface EmailProps {
    title: string
    preview: string
    recipientName: string
    recipientEmail: string
    content: string
}

const RadarApi = (instance: AxiosInstance) => ({
    get: (endpoint: string) => instance.get(endpoint),
    post: (endpoint: string, data: any) => instance.post(endpoint, data),
    signIn: (data: SignInProps) => instance.post('/users/sign-in', data),
    home: {
        loadHomes: (status: (string | null)[], id?: number) =>
            instance.post('/homes/index', { status, relocationId: id }),
        setOfferStatus: (status: string, id: number, date?: Date) =>
            instance.post('/homes/offer/status', { status, id, date }),
    },
    relocation: {
        getForUser: (userId: number) =>
            instance.get(`/relocations?userId=${userId}`),
    },
    users: {
        resetPassword: (
            userId: number,
            oldPassword: string,
            newPassword: string
        ) =>
            instance.post(`/users/reset-password`, {
                userId,
                oldPassword,
                newPassword,
            }),
    },
    messageBus: {
        alert: (text: string) =>
            instance.post(`/message-bus/notify`, { text, channel: 'alerts' }),
        email: (props: EmailProps) =>
            instance.post(`/message-bus/email`, {
                props,
                type: 'transactional',
                template: 'transactional',
            }),
    },
    companies: {
        create: (name: string) => instance.post(`/companies/create`, { name }),
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
        const userEndpoint = user ? `${endpoint}?userId=${user.id}` : endpoint

        const request = await (method === 'POST'
            ? create().post(
                  userEndpoint,
                  user ? { userId: user.id, ...data } : data
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
