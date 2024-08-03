import {ItemNodeProps} from "@/types/flownode"
import {Handle, Position} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"


export function ItemNode({data}: ItemNodeProps) {
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            {data.selected && <Handle type="source" position={Position.Right}/>}
            <div className={data.selected ? style.selectItemNode : style.itemNode}>
                <p className={style.ItemText}>
                    {data.label}
                </p>
            </div>
        </>
    )
}