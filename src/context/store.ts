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
import Api from "@/lib/api";
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
    throttle: 16,
    authEndpoint: async (room?) => {
        const response = await Api.joinRealtimeRoom(room as string) as unknown as Record<string, string>
        const responseData = response.data as unknown as Record<string, string>
        return {token: responseData.access_token};
    }
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