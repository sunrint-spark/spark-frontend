import {ItemNodeProps} from '@/types/flownode'
import {Handle, Position} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"
import {CircleIcon} from "@/components/ui/icon";


export function ResultDefaultNode({data}: ItemNodeProps) {
    return (
        <>
            {data.selected && <Handle type="target" position={Position.Right}/>}
            <div className={style.resultDefaultNode}>
                <h2>교통 신호 최적화 프로젝트</h2>
                <p>교통 신호 최적화 프로젝트는 도시의 교통 체증을 해결하기 위해 교통 신호를 최적화하는 프로젝트입니다.</p>
                <div className={style.resultDefaultNodeOption}>
                    <div className={style.resultDefaultNodeButton}>
                        <CircleIcon/>
                        <span>등장인물?</span>
                    </div>
                    <div className={style.resultDefaultNodeButton}>
                        <CircleIcon/>
                        <span>등장인물?</span>
                    </div>
                </div>
            </div>
        </>
    )
}