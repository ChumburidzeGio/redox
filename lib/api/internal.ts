import axios, { AxiosInstance } from "axios";

const EmployerApi = (instance: AxiosInstance) => ({
  invite: (email: string) => instance.post("/employer/invite", { email }),
  loadEmployees: () => instance.get("/employer/load-employees"),
});

const UserApi = (instance: AxiosInstance) => ({
  resetPassword: (oldPassword: string, newPassword: string) =>
    instance.post("/auth/reset", { oldPassword, newPassword }),
});

const HomesApi = (instance: AxiosInstance) => ({
  renterScore: (data: Record<string, string | number>) =>
    instance.post("/homes/renter-score", data),
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
    homes: HomesApi(axiosInstance),
  };
};

export default create();
