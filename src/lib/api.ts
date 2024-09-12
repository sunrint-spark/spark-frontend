import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

interface BodyUserAuth {
    state: string | null;
    code: string | null;
}

// interface Flow {
//     _id: string;
//     editor_option: {
//         viewport: { [key: string]: number };
//     };
//     nodes: object[];
//     edges: object[];
//     permission: { [key: string]: FlowUserPermission[] };
// }

// interface FlowUserPermission {
//     permission: ('read' | 'write')[];
// }

export const BASEURL = localStorage.getItem('$DEV.BASEURL') || 'https://spark-api.ychan.me';


class SparkApiRequester {
    private baseURL: string;
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
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
    
    async logout(): Promise<AxiosResponse<never>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return this.axiosInstance.post('/user/logout', {}, config);
    }
    
    async getProfile(): Promise<Record<string, unknown>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.axiosInstance.get('/user/profile', config);
        return response.data;
    }
    
    async getFlow(): Promise<Record<string, unknown>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.axiosInstance.get('/flows/', config);
        return response.data;
    }

    async createFlow(prompt: string): Promise<Record<string, string>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                prompt: prompt,
            }
        };
        const response = await this.axiosInstance.post('/flows/', null, config);
        return response.data;
    }

    async getRecommendFlow(): Promise<Record<string, string>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.axiosInstance.get('/flows/recommend', config);
        return response.data;
    }

    async getRecentFlow(): Promise<Record<string, string>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.axiosInstance.get('/flows/recent', config);
        return response.data;
    }

    async joinRealtimeRoom(flowId: string, isCommunity: boolean): Promise<Record<string, string>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        if (isCommunity) {
            config.params = {community: true}
        }
        const response = await this.axiosInstance.get(`/realtime/${flowId}/join`, config);
        return response.data;
    }

    async streamAIBrainstorm(threadId: string, prompt: string): Promise<Record<string, unknown>> {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                prompt: prompt,
                thread_id: threadId,
            }
        };

        const response = await this.axiosInstance.get(`/brainstorm/stream`, config);
        return response.data;
    }
}

const Api = new SparkApiRequester(BASEURL);
export default Api;
