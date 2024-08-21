export interface ItemNodeData {
    selected: boolean;
    label: string;
    sourceThreadId: string;
}

export interface MemoNodeData extends ItemNodeData {
    text: string;
    authorName: string;
}

export interface ItemNodeProps {
    data: ItemNodeData;
    id: string;
}

export interface ResultDefaultNodeData {
    title: string;
    description: string[];
    options: string[];
    optionsUrl: string[];
}

export interface ResultDefaultNodeProps {
    data: ResultDefaultNodeData;
    id: string;
}

export interface MemoNodeProps {
    id: string;
    data: MemoNodeData;
}
