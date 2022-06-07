import axios, { AxiosInstance } from "axios";

const EmployerApi = (instance: AxiosInstance) => ({
  invite: (email: string) => instance.post("/employer/invite", { email }),
  loadEmployees: () => instance.get("/employer/load-employees"),
});

const HomeApi = (instance: AxiosInstance) => ({
  loadHomes: () => instance.post("/home/load-homes"),
  setOfferStatus: (status: string | null, id: number, date?: Date | string) =>
    instance.post(`home/set-offer-status`, { status, id, date }),
});

const UserApi = (instance: AxiosInstance) => ({
  signup: (data: Record<string, string>) =>
    instance.post('/auth/signup', data),
  resetPassword: (oldPassword: string, newPassword: string) =>
    instance.post("/auth/reset", { oldPassword, newPassword }),
});

const create = () => {
  const axiosInstance = axios.create({
    baseURL: "/api",
    responseType: "json",
    withCredentials: true,
  });

  return {
    employer: EmployerApi(axiosInstance),
    user: UserApi(axiosInstance),
    home: HomeApi(axiosInstance),
  };
};

export default create();
