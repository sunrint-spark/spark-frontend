import {ItemNodeProps} from "@/types/flownode"
import {Handle, Node, Position, useNodes} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"
import useLBRealtimeStore from "@/context/store.ts";
import Api from "@/lib/api";
import {generateRandomCode} from "@/lib/tree.ts";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"


export function ItemNode({id, data}: ItemNodeProps) {
    const { nodes, setNodes, edges, setEdges } = useLBRealtimeStore();
    const thisNode = useNodes().find(n => n.id === id) as Node;
    const { toast } = useToast()

    const handleClick = async (command: string) => {
        data.selected = true
        if (command == "#markdown") {
            toast({
                title: "AI 노션 정리 중",
                description: "노션으로 내보내기 중입니다...",
            })
        }
        toast({description: "AI로 내용 생성중..."})
        const response = await Api.streamAIBrainstorm(
            data.sourceThreadId, command
        )
        console.log(`[AIStartupNode] threadSelect: ${data.sourceThreadId}, command: ${command}`)
        const result = response.result as Record<string, unknown>
        if (command == "#markdown") {
            console.log(`[AIStartupNode] markdown: ${result}`)
            const markdown = result.page_url as string
            toast({
                title: "노션으로 내보내기 완료",
                description: "노션으로 내보내기가 완료되었습니다.",
                action: <ToastAction altText="Try again" onClick={
                    () => {
                        window.open(markdown, "_blank")
                    }
                }>열기</ToastAction>,
            })
        }
        else {
            if (result.status === "select") {
                const resultCategoryData = result.subcategories as string[]
                const {x: sourceX, y: sourceY} = thisNode.position
                const newNodes = resultCategoryData.map((category: string, index: number): Node => {
                    const startY = sourceY + (100 * index);
                    console.log(index)
                    return {
                        id: generateRandomCode() as string,
                        type: 'itemNode',
                        data: {
                            label: category,
                            sourceThreadId: data.sourceThreadId,
                            selected: false,
                        },
                        position: {
                            y: startY,
                            x: sourceX+300,
                        },
                    }
                })
                const updateNodeData = (
                    nodeId: string,
                ): void => {
                    const updatedNodes = nodes.map((node) =>
                        node.id === nodeId ? { ...node, data: {
                                ...node.data, selected: true
                            } } : node
                    );
                    setNodes([...nodes, ...newNodes, ...updatedNodes]);
                };
                updateNodeData(id);
                const newEdges = newNodes.map((node: Node) => {
                    return {
                        id: generateRandomCode() as string,
                        source: id,
                        target: node.id,
                    }
                })
                setEdges([...edges, ...newEdges])
            } else if (result.status === "end") {
                console.log(`[AIStartupNode] end: ${result}`)
                const newNode: Node = {
                    id: generateRandomCode() as string,
                    type: 'resultDefaultNode',
                    data: {
                        title: result.title as string,
                        description: result.idea as string[],
                        options: result.search_keyword as string[],
                        optionsUrl: result.search_urls as string[],
                    },
                    position: {
                        y: thisNode.position.y,
                        x: thisNode.position.x+300,
                    },
                }
                const updateNodeData = (
                    nodeId: string,
                ): void => {
                    const updatedNodes = nodes.map((node) =>
                        node.id === nodeId ? { ...node, data: {
                                ...node.data, selected: true
                            } } : node
                    );
                    setNodes([...nodes, newNode, ...updatedNodes]);
                };
                updateNodeData(id);
                const newEdge = {
                    id: generateRandomCode() as string,
                    source: id,
                    target: newNode.id,
                }
                setEdges([...edges, newEdge])
            }
        }
    }

    return (
        <ContextMenu>
            <div onClick={() => {
                handleClick(data.label as string)
            }}>
                <ContextMenuTrigger>
                    <Handle type="target" position={Position.Left} id={generateRandomCode()}/>
                    {data.selected && <Handle type="source" position={Position.Right}/>}
                    <div className={data.selected ? style.selectItemNode : style.itemNode}>
                        <p className={style.ItemText}>
                            {data.label}
                        </p>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem inset onClick={() => {
                        handleClick(data.label as string)
                    }}>
                        선택
                        <ContextMenuShortcut>[Left Click]</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset onClick={() => {
                        handleClick(`#end ${data.label}`)
                    }}>
                        여기서 결과값 보기
                    </ContextMenuItem>
                    <ContextMenuItem inset onClick={() => {
                        handleClick("#markdown")
                    }}>
                        노션으로 정리하기
                    </ContextMenuItem>
                </ContextMenuContent>
            </div>
        </ContextMenu>
    )
}