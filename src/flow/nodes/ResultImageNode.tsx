import style from "@/styles/flownode.module.scss"
import {CircleIcon} from "@/components/ui/icon";


export function ResultImageNode() {
    return (
        <>
            <div className={style.resultNodeImageContainer}>
                {/*{data.selected && <Handle type="target" position={Position.Right}/>}*/}
                <img src="https://i.ibb.co/6R9W67T/dd4309fa709a6fb9c964e022d356a8a2.png" alt="placeholder" className={style.resultNodeImage}/>
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