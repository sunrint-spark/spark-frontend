import "../styles/ideaboard.css"
import { ReactFlowProvider } from '@xyflow/react'
import FlowApp from "../flow"
import {useModal} from "../modal/ModalContext";

function Brainstorm(){
    const { isModalOpen1, } = useModal();

    console.log('isModalOpen1:', isModalOpen1);

    return(
        <div className="ideaboard">
            <div className="brainstorm">
                <ReactFlowProvider>
                    <FlowApp/>
                </ReactFlowProvider>
            </div>
        </div>
)

}

export default Brainstorm;