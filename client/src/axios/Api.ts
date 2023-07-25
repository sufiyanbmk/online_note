import axiosInstance from "./Axios";

export function getdata(route:string) {
  return axiosInstance.get(route, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
}
export function postForm(route:string, data:any) {
  return axiosInstance.post(route, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
}