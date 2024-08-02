import {Handle, Position} from '@xyflow/react';
import style from "@/styles/flownode.module.scss"

interface ItemNodeData {
    selected: boolean;
    label: string;
}

interface ItemNodeProps {
    data: ItemNodeData;
}

export function ItemNode({data}: ItemNodeProps) {
    return (
        <>
            <Handle type="source" position={Position.Left}/>
            {data.selected && <Handle type="target" position={Position.Right}/>}
            <div className={data.selected ? style.selectItemNode : style.itemNode}>
                <p className={style.ItemText}>
                    {data.label}
                </p>
            </div>
        </>
    )
}