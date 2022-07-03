import axios, { AxiosInstance } from 'axios'
import config from 'config'

interface SignInProps {
    email: string
    password: string
}

interface SignUpProps extends SignInProps {
    firstName: string
    lastName: string
    role: 'customer' | 'employer'
}

interface EmailProps {
    title: string
    preview: string
    recipientName: string
    recipientEmail: string
    content: string
}

const RadarApi = (instance: AxiosInstance) => ({
    signIn: (data: SignInProps) => instance.post('/users/sign-in', data),
    signUp: (data: SignUpProps) => instance.post('/users/sign-up', data),
    employer: {
        relocations: (employerId: number) =>
            instance.get(`/relocations/employer/${employerId}`),
    },
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
        id: (id: number) => instance.get(`/users/id/${id}`),
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
})

const create = () => {
    const axiosInstance = axios.create({
        baseURL: config.services.redar.baseUrl,
        responseType: 'json',
        withCredentials: true,
    })

    return RadarApi(axiosInstance)
}

export default create()
