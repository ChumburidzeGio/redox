import axios, { AxiosInstance } from 'axios'
import config from "config"

interface RedarSignInProps {
    email: string
    password: string
}

interface RedarSignUpProps extends RedarSignInProps {
    name: string
}

const RadarApi = (instance: AxiosInstance) => ({
    signIn: (data: RedarSignInProps) => instance.post('/users/sign-in', data),
    signUp: (data: RedarSignUpProps) => instance.post('/users/sign-up', data),
    employer: {
        relocations: (employerId: number) => instance.get(`/relocations/employer/${employerId}`)
    },
    users: {
        id: (id: number) => instance.get(`/users/id/${id}`),
        resetPassword: (userId: number, oldPassword: string, newPassword: string) => instance.post(`/users/reset-password`, {
            userId, oldPassword, newPassword
        })
    },
    messageBus: {
        adminNotify: (text: string) => instance.post(`/message-bus/admin-notify`, { text }),
    }
})

const create = () => {
    const axiosInstance = axios.create({
        baseURL: config.services.redar.baseUrl,
        responseType: 'json',
        withCredentials: true
    })

    return {
        redarApi: RadarApi(axiosInstance)
    }
}

export default create()