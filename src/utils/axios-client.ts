import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

const createAxiosClient = (
    baseURL: string,
    headers: any = {},
):AxiosInstance =>{

    const client = axios.create({
        baseURL,
        headers: headers,
    });
    axiosRetry(client, { retries: 3 });
    return client;
}

export default createAxiosClient;