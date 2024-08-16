import {useState} from "react";
import {Handle, Position} from '@xyflow/react';

import {Card} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"

import useRFStore from "@/context/store";
import Api from "@/lib/api";

interface NodeData {
    text: string
}

interface CustomNodeProps {
    id: string;
    type: string;
    data: NodeData;
}

const AIStartupNode: React.FC<CustomNodeProps> = ({data }) => {
    // const { nodes, setNodes } = useRFStore();
    const [text, setText] = useState(data.text);

    const handleClick = async () => {
        Api.setToken(localStorage.getItem('token') as string)
        const response = await Api.streamAIBrainstorm(
            "new", text
        )
        const newThreadId = response.thread_id
        const result = response.result as Record<string, string>
        const a = result.subcategories

    }

  return (
      <div style={{transform: 'scale(0.7)'}}>
          <Handle type="source" position={Position.Right} style={{transform: 'scale(2.0)', transformOrigin: 'top left'}}  />
          <Card className="w-full max-w-md p-6 space-y-4">
              <div>
                  <div className="space-y-1">
                      <h3 className="text-2xl font-bold">AI와 함께 브레인스토밍 시작하기</h3>
                  </div>
                  <div className="space-y-4">
                      <div className="space-y-1">
                          <Label htmlFor="email">원하는 아이디어나 주제 입력하기</Label>
                          <Input
                              id="text" type="text"
                              placeholder="예) 환경과 관련 있는 웹사이트 만들기"
                              className="w-full"
                              value={text} onChange={(e) => {setText(e.target.value)}}
                          />
                      </div>
                      <Button className="w-full" onClick={handleClick}>
                          시작하기
                      </Button>
                  </div>
              </div>
          </Card>
      </div>
  )
}

export {AIStartupNode};
