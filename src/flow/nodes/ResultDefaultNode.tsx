import {ResultDefaultNodeProps} from '@/types/flownode'
import {Handle, Position} from '@xyflow/react'
import style from "@/styles/flownode.module.scss"
import {CircleIcon} from "@/components/ui/icon";


export function ResultDefaultNode({data}: ResultDefaultNodeProps) {
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div className={style.resultDefaultNode}>
                <h2>{data.title}</h2>
                {
                    data.description.map((content: string, index: number) => {
                        return (
                            <p key={`result-textcontent-${index}`}>{content}</p>
                        )
                    })
                }

                <div className={style.resultDefaultNodeOption}>
                    {
                        data.options.map((option: string, index: number) => {
                            return (
                                <div
                                    className={style.resultDefaultNodeButton}
                                    onClick={() => {
                                        window.open(data.optionsUrl[index], "_blank");
                                    }}
                                    key={`result-option-${index}`}
                                >
                                    <CircleIcon/>
                                    <span>{option}</span>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </>
    )
}