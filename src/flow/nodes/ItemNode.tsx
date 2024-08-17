import {ItemNodeProps} from "@/types/flownode"
import {Handle, Node, Position, useNodes} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"
import useLBRealtimeStore from "@/context/store.ts";
import Api from "@/lib/api";
import {generateRandomCode} from "@/lib/tree.ts";


export function ItemNode({id, data}: ItemNodeProps) {
    const { nodes, setNodes, edges, setEdges } = useLBRealtimeStore();
    const thisNode = useNodes().find(n => n.id === id) as Node;

    const handleClick = async () => {
        data.selected = true
        Api.setToken(localStorage.getItem('token') as string)
        const response = await Api.streamAIBrainstorm(
            data.sourceThreadId, data.label as string
        )
        console.log(`[AIStartupNode] threadSelect: ${data.sourceThreadId}, select:${data.label}`)
        const result = response.result as Record<string, unknown>
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
    }

    return (
        <div onClick={handleClick}>
            <Handle type="target" position={Position.Left}/>
            {data.selected && <Handle type="source" position={Position.Right}/>}
            <div className={data.selected ? style.selectItemNode : style.itemNode}>
                <p className={style.ItemText}>
                    {data.label}
                </p>
            </div>
        </div>
    )
}