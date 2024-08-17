import {useNavigate, useParams} from "react-router-dom";
import Api from "@/lib/api";
import {useRealtime} from "@/lib/realtime";
import {useEffect, useState} from 'react';
import {
    ReactFlow,
    Edge,
    Node,
    Background,
    Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {AIStartupNode} from "@/flow/nodes/AIStartupNode"
import {ItemNode} from "@/flow/nodes/ItemNode"
import {MemoNode} from "@/flow/nodes/MemoNode"
import {ResultDefaultNode} from "@/flow/nodes/ResultDefaultNode";
import {ResultImageNode} from "@/flow/nodes/ResultImageNode";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {AxiosError} from "axios";

import { useToast } from "@/components/ui/use-toast"
import useLBRealtimeStore from "@/context/store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const storeSelector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
});

const nodeTypes = {
    aiStartupNode: AIStartupNode,
    itemNode: ItemNode,
    memoNode: MemoNode,
    resultDefaultNode: ResultDefaultNode,
    resultImageNode: ResultImageNode,
};


export default function FlowApp() {
    const navigate = useNavigate();
    const { flowId } = useParams();
    const { toast } = useToast();

    const [readyRealtime, setReadyRealtime] = useState(false)
    const [readyConnection, setReadyConnection] = useState(false)
    const {newReceivedMessage, connect} = useRealtime(flowId as string);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState({} as Record<string, string>)
    const {
        liveblocks: { enterRoom, leaveRoom, isStorageLoading },
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useLBRealtimeStore();

    useEffect(
        () => {
            async function loadData() {
                try {
                    Api.setToken(localStorage.getItem('token') as string)
                    const response = await Api.joinRealtimeRoom(
                        flowId as string
                    ) as Record<string, unknown>
                    console.log(response.data)
                    const {edges: defaultEdges, nodes: defaultNodes} = response.data as Record<string, unknown>
                    setNodes(defaultNodes as Node[])
                    setEdges(defaultEdges as Edge[])
                    setDialogData(
                        {
                            title: "데이터를 불러오는중...",
                            description: "[TIP]  / 키를 누르면 다른 사용자들과 실시간으로 채팅할 수 있습니다."
                        }
                    )
                    setIsDialogOpen(true)
                    setReadyConnection(true)
                } catch (e) {
                    const error = e as AxiosError;
                    if (error.code == 'ERR_BAD_REQUEST') {
                        setDialogData({
                            title: "이 아이디어 보드에 권한이 없음",
                            description: "이 보드에 접근할 권한이 없습니다.",
                            error: "true"
                        })
                    } else if (error.code == 'ERR_NETWORK') {
                        setDialogData({
                            title: "서버 오류",
                            description: "서버에 응답이 없습니다. 잠시 후 다시 시도해주세요.",
                            error: "true"
                        })
                    } else {
                        setDialogData({
                            title: "알 수 없는 오류",
                            description: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                            error: "true"
                        })
                    }
                    setIsDialogOpen(true)
                    console.error(e);
                }
            }
            if (!readyConnection) {
                loadData();
            }
        },
        []
    )

    useEffect(() => {
        connect();
    }, [readyConnection]);

    useEffect(() => {
        enterRoom(flowId as string);
        return () => leaveRoom();
    }, [enterRoom, leaveRoom, flowId]);

    useEffect(() => {
        if (newReceivedMessage) {
            if (newReceivedMessage.op == 0) {
                toast({
                    title: "서버에 연결됨",
                })
                setReadyRealtime(true)
                setIsDialogOpen(false)
            } else if (newReceivedMessage.op == 1) {
                toast({
                    title: `${newReceivedMessage.data.name}님이 참가했습니다`,
                    description: `@${newReceivedMessage.data.username}`,
                })
            } else if (newReceivedMessage.op == 2) {
                toast({
                    title: `${newReceivedMessage.data.name}님이 나갔습니다`,
                    description: `@${newReceivedMessage.data.username}`,
                })
            }
        }
    }, [newReceivedMessage]);

    if (isStorageLoading) {
        return (
            <div>
                로딩중...
            </div>
        )
    }

    return (
        <>
            <div style={{width: '100vw', height: '100vh'}}>
                <AlertDialog open={isDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {dialogData.title}
                            </AlertDialogTitle>
                            <AlertDialogDescription style={{
                                color: "white"
                            }}>
                                {dialogData.description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        {dialogData.error == "true" && (
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={
                                    async () => {
                                        setIsDialogOpen(false)
                                        return navigate('/')
                                    }
                                }>확인</AlertDialogAction>
                            </AlertDialogFooter>
                        )}
                    </AlertDialogContent>
                </AlertDialog>
                <ReactFlow
                    colorMode="dark"
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <Controls aria-label="flow-control"/>
                    <Background bgColor="#131619"/>
                </ReactFlow>
            </div>
        </>
    );
}