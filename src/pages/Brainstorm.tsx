import "../styles/ideaboard.css"
import { ReactFlowProvider } from '@xyflow/react'
import FlowApp from "../flow"
import {useModal} from "../modal/ModalContext";

function Brainstorm(){
    const { isModalOpen1, closeModal1, isModalOpen2, closeModal2 } = useModal();

    console.log('isModalOpen1:', isModalOpen1);
    console.log('isModalOpen2:', isModalOpen2);

    const lists = ['방장','편집자','편집자','보기 전용']

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