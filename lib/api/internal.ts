import axios, { AxiosInstance } from 'axios'

const EmployerApi = (instance: AxiosInstance) => ({
    invite: (email: string) => instance.post('/employer/invite', { email }),
    loadEmployees: () => instance.get('/employer/load-employees'),
})

const create = () => {
    const axiosInstance = axios.create({
        baseURL: '/api',
        responseType: 'json',
        withCredentials: true
    })

    return {
        employer: EmployerApi(axiosInstance)
    }
}

export default create()
