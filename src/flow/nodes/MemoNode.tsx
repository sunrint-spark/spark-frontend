import {MemoNodeProps} from "@/types/flownode"
import {Handle, Position} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"


export function MemoNode({data}: MemoNodeProps) {
    return (
        <>
            <Handle type="source" position={Position.Top}/>
            <div className={style.memoNode}>
                <p className={style.memoText}>
                    {data.label}
                </p>
                <p className={style.memoTextAuthor}>
                    {data.authorName}
                </p>
            </div>
        </>
    )
}