import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface BodyUserAuth {
    state: string | null;
    code: string | null;
}

interface Flow {
    _id: string;
    editor_option: {
        viewport: { [key: string]: number };
    };
    nodes: object[];
    edges: object[];
    permission: { [key: string]: FlowUserPermission[] };
}

interface FlowUserPermission {
    permission: ('read' | 'write')[];
}

export const BASEURL = 'http://localhost:9000';


class SparkApiRequester {
    private baseURL: string;
    private axiosInstance: AxiosInstance;
    private token: string | null;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.token = null;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
        });
    }

    setBaseURL(baseURL: string) {
        this.baseURL = baseURL;
        this.axiosInstance.defaults.baseURL = baseURL;
    }
    
    async authenticate(data: BodyUserAuth): Promise<Record<string, string>> {
        const response = await this.axiosInstance.post('/user/auth', data);
        return response.data;
    }

    setToken(token: string) {
        this.token = token;
    }
    
    async logout(): Promise<AxiosResponse<never>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        return this.axiosInstance.post('/user/logout', {}, config);
    }
    
    async getProfile(): Promise<Record<string, unknown>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        const response = await this.axiosInstance.get('/user/profile', config);
        return response.data;
    }
    
    async createFlow(flow: Flow): Promise<AxiosResponse<never>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        return this.axiosInstance.post('/flows/', flow, config);
    }
}

const Api = new SparkApiRequester(BASEURL);
export default Api;
