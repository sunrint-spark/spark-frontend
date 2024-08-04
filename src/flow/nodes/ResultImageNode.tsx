import {ItemNodeProps} from '@/types/flownode'
import {Handle, Position} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"
import {CircleIcon} from "@/components/ui/icon";


export function ResultImageNode({data}: ItemNodeProps) {
    return (
        <>
            <div className={style.resultNodeImageContainer}>
                {data.selected && <Handle type="target" position={Position.Right}/>}
                <img src="https://media.discordapp.net/attachments/1264544993154961511/1269719258825359400/JQKCdBZfnvcFN83IEH42ncYHjO-lUhZ-6IZ1sZQA0Y53mBZC44hSHvJ4j18knewgHJYVct47W4Xpaj7ug_SWazqgBCyGGjxUNMsYf2HYO-jvJ631QtgCZy6P07oJD37uwuN1VBy2pXKkcROvJCProw_1.png?ex=66b115b5&is=66afc435&hm=48d554dc0cfbe155bd4611b91aa684c8a7139472cf58a67ee7f25f669aa69131&=&format=webp&quality=lossless&width=186&height=250" alt="placeholder" className={style.resultNodeImage}/>
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
            </div>
        </>
    )
}