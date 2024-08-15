import {useNavigate, useParams} from "react-router-dom";
import Api from "@/lib/api";
import {useRealtime} from "@/lib/realtime";
import {useCallback, useEffect, useState} from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    Connection,
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


const nodeTypes = {
    aiStartupNode: AIStartupNode,
    itemNode: ItemNode,
    memoNode: MemoNode,
    resultDefaultNode: ResultDefaultNode,
    resultImageNode: ResultImageNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'aiStartupNode',
        position: { x: 250, y: 5 },
        data: { text: 'AI와 함께 브레인스토밍 시작하기' },
    },
    {
        id: '2',
        type: 'itemNode',
        position: { x: 250, y: 200 },
        data: { text: '아이템 추가하기' },
    },
    {
        id: '3',
        type: 'memoNode',
        position: { x: 250, y: 400 },
        data: { text: '메모 추가하기' },
    },
    {
        id: '4',
        type: 'resultDefaultNode',
        position: { x: 250, y: 600 },
        data: { text: '결과 확인하기' },
    },
    {
        id: '5',
        type: 'resultImageNode',
        position: { x: 250, y: 800 },
        data: { text: '이미지 결과 확인하기' },
    },
    {
        id: '6',
        type: 'userCursorNode',
        position: { x: 250, y: 1000 },
        data: { message: 'User Cursor' },
    },
];

const initialEdges: Edge[] = [];

export default function FlowApp() {
    const navigate = useNavigate();
    const { flowId } = useParams();
    const { toast } = useToast();

    const [readyConnection, setReadyConnection] = useState(false)
    const {newReceivedMessage, sendMessage, connect, closeConnection} = useRealtime(flowId as string);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState({} as Record<string, string>)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({...params, style: {
            stroke: '#fff',
            strokeWidth: 2,
            }}, eds)),
        [setEdges]
    );

    useEffect(
        () => {
            async function loadData() {
                try {
                    Api.setToken(localStorage.getItem('token') as string)
                    const response = await Api.joinRealtimeRoom(
                        flowId as string
                    ) as Record<string, unknown>
                    console.log(response.data)
                    const flowData = response.data as Record<string, unknown>
                    // setNodes(flowData.nodes as Node[])
                    setEdges(flowData.edges as Edge[])
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
        setIsDialogOpen(false);
    }, [readyConnection]);

    useEffect(() => {
        if (newReceivedMessage) {
            if (newReceivedMessage.op == 0) {
                toast({
                    title: "서버에 연결됨",
                })
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

    useEffect(() => {
        console.log("Nodes changed:", JSON.stringify(nodes, null, 2));
    }, [nodes]);

    useEffect(() => {
        console.log("Edges changed:", JSON.stringify(edges, null, 2));
    }, [edges])

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