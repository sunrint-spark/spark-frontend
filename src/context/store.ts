import { create } from "zustand";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
} from "@xyflow/react";
import { createClient } from "@liveblocks/client";
import type { EnsureJson } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";

declare global {
    interface Liveblocks {
        Storage: Storage;
    }
}

const client = createClient({
    publicApiKey: 'pk_dev_QVCEyHwYh2d0NEBIETvzHk8WKMToNWr0vmpe6kzwAC1Fwhr4ehSMLAnKROAgFUiv' as string,
    throttle: 16,
});

type FlowState = {
    nodes: Node[] | [];
    edges: Edge[] | [];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
};

type Storage = EnsureJson<{
    nodes: FlowState["nodes"];
    edges: FlowState["edges"];
}>;

const defaultNodes = [] as Node[];
const defaultEdges = [] as Edge[];

const useLBRealtimeStore = create<WithLiveblocks<FlowState>>()(
    liveblocks(
        (set, get) => ({
            nodes: defaultNodes,
            edges: defaultEdges,

            onNodesChange: (changes: NodeChange[]) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes),
                });
            },
            onEdgesChange: (changes: EdgeChange[]) => {
                set({
                    edges: applyEdgeChanges(changes, get().edges),
                });
            },
            onConnect: (connection: Connection) => {
                set({
                    edges: addEdge(connection, get().edges),
                });
            },
            setNodes: (nodes: Node[]) => {
                set({ nodes });
            },
            setEdges: (edges: Edge[]) => {
                set({ edges });
            },
        }),
        {
            client,

            storageMapping: {
                nodes: true,
                edges: true,
            },
        }
    )
);


export default useLBRealtimeStore;