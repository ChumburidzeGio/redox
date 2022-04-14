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
        loadRelocations: (employerId: number) => instance.get(`/relocations/employer/${employerId}`)
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
