import React, {useState} from "react";
import {Handle, Position, Node, useNodes, NodeProps} from '@xyflow/react';

import {Card} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"

import useLBRealtimeStore from "@/context/store";
import Api from "@/lib/api";
import {generateRandomCode} from "@/lib/tree";
import { toast } from "sonner";


// @ts-ignore
const AIStartupNode: React.FC = ({id, data }: NodeProps) => {
    // const { nodes, setNodes } = useRFStore();
    const [text, setText] = useState(data.text);
    const thisNode = useNodes().find(n => n.id === id) as Node;
    const { nodes, setNodes, edges, setEdges } = useLBRealtimeStore();

    const handleClick = async () => {
        toast("AI로 내용 생성중...")
        data.isAllowEditing = false
        const response = await Api.streamAIBrainstorm(
            "new", data.text as string
        )
        const newThreadId = response.thread_id
        console.log(`[AIStartupNode] newThreadId: ${newThreadId}`)
        const result = response.result as Record<string, unknown>
        const resultCategoryData = result.subcategories as string[]

        const {x: sourceX, y: sourceY} = thisNode.position
        const newNodes = resultCategoryData.map((category: string, index: number): Node => {
            const startX = sourceX + 300;
            const startY = sourceY - 70 + (100 * index);
            console.log(index)
            return {
                id: generateRandomCode() as string,
                type: 'itemNode',
                data: {
                    label: category,
                    sourceThreadId: newThreadId,
                    selected: false,
                },
                position: {
                    y: startY,
                    x: startX+150,
                },
            }
        })
        const updateNodeData = (
            nodeId: string,
        ): void => {
            const updatedNodes = nodes.map((node) =>
                node.id === nodeId ? { ...node, data: {
                        ...node.data, isAllowEditing: false
                    } } : node
            );
            setNodes([...nodes, ...newNodes, ...updatedNodes]);
        };
        updateNodeData(id);

        const newEdges = newNodes.map((node: Node) => {
            return {
                id: generateRandomCode() as string,
                source: id,
                target: node.id,
            }
        })
        setEdges([...edges, ...newEdges])
    }

  return (
      <div style={{transform: 'scale(0.7)'}}>
          <Handle
              type="source"
              position={Position.Right}
              style={{transform: 'scale(2.0)', transformOrigin: 'top left'}}
              id={generateRandomCode()}
          />
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
                              value={text as string} onChange={(e) => {setText(e.target.value)}}
                              disabled={!data.isAllowEditing as boolean}
                          />
                      </div>
                      <Button className="w-full" onClick={handleClick} disabled={!data.isAllowEditing as boolean}>
                          시작하기
                      </Button>
                  </div>
              </div>
          </Card>
      </div>
  )
}

export {AIStartupNode};
