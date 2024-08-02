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


const nodeTypes = {
    aiStartupNode: AIStartupNode,
};

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'aiStartupNode',
        position: { x: 0, y: 0 },
        data: { label: 'AI와 함께 브레인스토밍 시작하기' },
    },
    { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowApp() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    useEffect(() => {
        console.log("Nodes changed:", JSON.stringify(nodes, null, 2));
    }, [nodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls aria-label="flow-control"/>
                <Background />
            </ReactFlow>
        </div>
    );
}