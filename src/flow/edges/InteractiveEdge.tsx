import { BaseEdge, getStraightPath, EdgeProps} from '@xyflow/react'

export function ContextMenuEdge(props: EdgeProps) {
    const { sourceX, sourceY, targetX, targetY } = props;
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge {...props} path={edgePath} />
        </>
    )
}