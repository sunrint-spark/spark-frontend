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
        // The Storage tree for the room, for useMutation, useStorage, etc.
        Storage: Storage;
    }
}


// Create a Liveblocks client with your API key
const client = createClient({
    publicApiKey: 'pk_dev_QVCEyHwYh2d0NEBIETvzHk8WKMToNWr0vmpe6kzwAC1Fwhr4ehSMLAnKROAgFUiv' as string,
    throttle: 16, // Updates every 16ms === 60fps animation
});

type FlowState = {
    nodes: Node[] | [];
    edges: Edge[] | [];
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

const useStore = create<WithLiveblocks<FlowState>>()(
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
        }),
        {
            client,

            // Define the store properties that should be shared in real-time
            storageMapping: {
                nodes: true,
                edges: true,
            },
        }
    )
);


export default useStore;