export interface ItemNodeData {
    selected: boolean;
    label: string;
    sourceThreadId: string;
}

export interface MemoNodeData extends ItemNodeData {
    authorName: string;
}

export interface ItemNodeProps {
    data: ItemNodeData;
    id: string;
}

export interface MemoNodeProps {
    data: MemoNodeData;
}
