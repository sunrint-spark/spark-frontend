import {MemoNodeProps} from "@/types/flownode"
import {useState} from "react";
import style from "@/styles/flownode.module.scss"
import {Node} from '@xyflow/react';
import useLBRealtimeStore from "@/context/store.ts";


export function MemoNode({id, data}: MemoNodeProps) {
    const { nodes, setNodes } = useLBRealtimeStore();
    const thisNode = nodes.find(n => n.id === id) as Node;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_text, setText] = useState(thisNode.data.text as string);

    return (
        <>
            <div className={style.memoNode}>
                <p className={style.memoText}>
                    <textarea placeholder="여기에 메모 적기" value={data.text} onChange={
                        (e) => {
                            setText(e.target.value)
                            setNodes(nodes.map((node) =>
                                node.id === id ? { ...node, data: {
                                        ...node.data, text: e.target.value
                                    } } : node
                            ))
                        }
                    }/>
                </p>
                <p className={style.memoTextAuthor}>
                    {data.authorName}
                </p>
            </div>
        </>
    )
}