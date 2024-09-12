import {useNavigate, useParams} from "react-router-dom";
import Api from "@/lib/api";
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

import useLBRealtimeStore from "@/context/store";
import ToolBar from "@/components/ToolBar.tsx";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

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
    const [readyConnection, setReadyConnection] = useState(false)
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
    const [searchParams] = useSearchParams();

    useEffect(
        () => {
            async function loadData() {
                try {
                    const isCommunity: boolean = searchParams.get('share') as unknown as boolean;
                    const response = await Api.joinRealtimeRoom(
                        flowId as string, isCommunity
                    ) as Record<string, unknown>
                    console.log(response.data)
                    const {edges: defaultEdges, nodes: defaultNodes} = response.data as Record<string, unknown>
                    setNodes(defaultNodes as Node[])
                    setEdges(defaultEdges as Edge[])
                    setDialogData(
                        {
                            title: "데이터를 불러오는중...",
                            description: "잠시만 기다려주세요"
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
        if (!isStorageLoading) {
            setIsDialogOpen(false)
        }
    }, [isStorageLoading]);

    useEffect(() => {
        enterRoom(flowId as string);
        return () => leaveRoom();
    }, [enterRoom, leaveRoom, flowId]);

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
                <ToolBar/>
                <Toaster />
                {/*{!isStorageLoading && <ExportTextModal/>}*/}
                {/*<FlowShareModal/>*/}
            </div>
        </>
    );
}