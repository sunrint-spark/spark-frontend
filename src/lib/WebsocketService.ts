// WebSocketService.ts

export interface WebSocketMessage {
    op: number;
    msg?: string;
    data: Record<string, unknown>
}


export class WebSocketService {
    private socket: WebSocket | null = null;

    constructor(private url: string) {}

    connect(onMessage: (message: WebSocketMessage) => void) {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket 연결이 열렸습니다.');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data) as WebSocketMessage  // JSON 형식으로 메시지 파싱
                onMessage(data);
            } catch (error) {
                console.error('메시지 파싱 실패:', error);
            }
        };

        this.socket.onclose = () => {
            console.log('WebSocket 연결이 닫혔습니다.');
        };
    }

    sendMessage(message: any) {
        if (this.socket) {
            this.socket.send(JSON.stringify(message));  // JSON 형식으로 메시지 전송
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}
