import { ReactFlowProvider } from '@xyflow/react'
import FlowApp from "../flow"

function Brainstorm() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlowProvider>
                <FlowApp />
            </ReactFlowProvider>
        </div>
    );
}

export default Brainstorm;