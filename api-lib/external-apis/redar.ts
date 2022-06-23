import axios, { AxiosInstance } from 'axios'
import config from 'config'

interface RedarSignInProps {
    email: string
    password: string
}

interface RedarSignUpProps extends RedarSignInProps {
    first_name: string
    last_name: string
    role: 'customer' | 'employer'
}

const RadarApi = (instance: AxiosInstance) => ({
    signIn: (data: RedarSignInProps) => instance.post('/users/sign-in', data),
    signUp: (data: RedarSignUpProps) => instance.post('/users/sign-up', data),
    employer: {
        relocations: (employerId: number) =>
            instance.get(`/relocations/employer/${employerId}`),
    },
    home: {
        loadHomes: (status: (string | null)[], id?: number) =>
            instance.post('/homes/index', { status, relocationId: id }),
        setOfferStatus: (status: string, id: number, date?: Date) =>
            instance.post('/homes/offer/status', { status, id, date }),
        homesPerWeek: (data: {
            budgetMin: number
            budgetMax: number
            roomsMin: number
            roomsMax: number
        }) => instance.post('/homes/homes-per-week', data),
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
