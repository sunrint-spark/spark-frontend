import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
    
    async getFlow(): Promise<Record<string, unknown>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        const response = await this.axiosInstance.get('/flows/', config);
        return response.data;
    }

    async createFlow(prompt: string): Promise<Record<string, string>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
            params: {
                prompt: prompt,
            }
        };
        const response = await this.axiosInstance.post('/flows/', null, config);
        return response.data;
    }

    async getRecommendFlow(): Promise<Record<string, string>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        const response = await this.axiosInstance.get('/flows/recommend', config);
        return response.data;
    }

    async getRecentFlow(): Promise<Record<string, string>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        const response = await this.axiosInstance.get('/flows/recent', config);
        return response.data;
    }

    async joinRealtimeRoom(flowId: string): Promise<Record<string, string>> {
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
        };
        const response = await this.axiosInstance.post(`/realtime/join/${flowId}`, null, config);
        return response.data;
    }

    async *streamAIBrainstorm(threadId: string, prompt: string): AsyncGenerator<Record<string, unknown>, void, unknown> {
        let buffer = '';
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${this.token}` },
            params: {
                prompt: prompt,
                thread_id: threadId,
            }
        };

        try {
            const response = await this.axiosInstance.get(`/brainstorm`, config);
            const stream = response.data;

            for await (const chunk of stream) {
                buffer += chunk.toString('utf-8');
                let newlineIndex;
                while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                    const jsonLine = buffer.slice(0, newlineIndex);
                    buffer = buffer.slice(newlineIndex + 1);
                    try {
                        const jsonData = JSON.parse(jsonLine);
                        yield jsonData;
                    } catch (parseError) {
                        console.error('[stream] Failed to parse JSON:', parseError);
                    }
                }
            }

            // 마지막 버퍼 처리
            if (buffer.trim()) {
                try {
                    const jsonData = JSON.parse(buffer);
                    yield jsonData;
                } catch (parseError) {
                    console.error('[stream] Failed to parse JSON in remaining buffer:', parseError);
                }
            }
        } catch (error) {
            console.error('[stream] Error in /brainstorm:', error);
            throw error;
        }
    }
}

const Api = new SparkApiRequester(BASEURL);
export default Api;
