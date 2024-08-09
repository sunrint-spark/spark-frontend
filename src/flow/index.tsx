import { useCallback, useEffect } from 'react';
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


const nodeTypes = {
    aiStartupNode: AIStartupNode,
    itemNode: ItemNode,
    memoNode: MemoNode,
    resultDefaultNode: ResultDefaultNode,
    resultImageNode: ResultImageNode,
};

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'aiStartupNode',
        position: { x: 0, y: 0 },
        data: { label: 'AI와 함께 브레인스토밍 시작하기' },
    },
    {
        id: 'node-2',
        type: 'itemNode',
        position: { x: 300, y: 0 },
        data: { label: '대한1민국', selected: false},
    },

    {
        id: 'node-21',
        type: 'itemNode',
        position: { x: 300, y: 0 },
        data: { label: '대한1민국', selected: false},
    },

    {
        id: 'node-22',
        type: 'itemNode',
        position: { x: 300, y: 0 },
        data: { label: '대한1ㅇ민국', selected: false},
    },

    {
        id: 'node-23',
        type: 'itemNode',
        position: { x: 300, y: 0 },
        data: { label: '대한1민국', selected: true},
    },

    {
        id: 'node-42',
        type: 'itemNode',
        position: { x: 300, y: 0 },
        data: { label: '대한1민국', selected: true},
    },
    {
        id: 'node-3',
        type: 'itemNode',
        position: { x: 600, y: 0 },
        data: { label: '대한민55국' , selected: true},
    },
    {
        id: 'node-31',
        type: 'memoNode',
        position: { x: 600, y: 0 },
        data: { label: '대한민55국dwadawdwadwadawdawdwad' , selected: true, authorName: '김철수'},
    },
    {
        id: 'node-3',
        type: 'resultImageNode',
        position: { x: 600, y: 0 },
        data: { label: '대한민55국' , selected: true},
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: 'node-23',
        target: 'node-42',
    }
];

export default function FlowApp() {
    const [nodes, ,onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({...params, style: {
            stroke: '#fff',
            strokeWidth: 2,
            }}, eds)),
        [setEdges]
    );

    useEffect(() => {
        console.log("Nodes changed:", JSON.stringify(nodes, null, 2));
    }, [nodes]);

    useEffect(() => {
        console.log("Edges changed:", JSON.stringify(edges, null, 2));
    }, [edges])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
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
    );
}