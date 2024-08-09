export interface ItemNodeData {
    selected: boolean;
    label: string;
}

export interface MemoNodeData extends ItemNodeData {
    authorName: string;
}

export interface ItemNodeProps {
    data: ItemNodeData;
}

export interface MemoNodeProps {
    data: MemoNodeData;
}
