import { useState, useRef } from 'react';
import { WebSocketService, WebSocketMessage } from '@/lib/WebsocketService';
import {BASEURL} from "@/lib/api.ts";

export const useRealtime = (flowId: string) => {
    const url = BASEURL + `/realtime/${flowId}?token=${localStorage.getItem('token')}`;
    const [newReceivedMessage, setNewReceivedMessage] = useState<WebSocketMessage>();
    const webSocketService = useRef<WebSocketService | null>(null);

    const connect = () => {
        webSocketService.current = new WebSocketService(url);

        webSocketService.current.connect((message: WebSocketMessage) => {
            console.log(message)
            setNewReceivedMessage(message);  // 새 JSON 메시지를 상태로 저장
        });
    };

    const sendMessage = (message: WebSocketMessage) => {
        webSocketService.current?.sendMessage(message);
    };

    const closeConnection = () => {
        webSocketService.current?.close();
    };

    return { newReceivedMessage, sendMessage, connect, closeConnection };
};
