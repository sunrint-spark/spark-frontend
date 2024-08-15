import {Handle, Position} from '@xyflow/react';

import {Card} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"


export function AIStartupNode() {
  return (
      <div style={{transform: 'scale(0.7)'}}>
          <Handle type="source" position={Position.Right} style={{transform: 'scale(2.0)', transformOrigin: 'top left'}}  />
          <Card className="w-full max-w-md p-6 space-y-4">
              <div>
                  <div className="space-y-1">
                      <h3 className="text-2xl font-bold">AI와 함께 브레인스토밍 시작하기</h3>
                  </div>
                  <form className="space-y-4">
                      <div className="space-y-1">
                          <Label htmlFor="email">원하는 아이디어나 주제 입력하기</Label>
                          <Input id="text" type="text" placeholder="예) 환경과 관련 있는 웹사이트 만들기" className="w-full"/>
                      </div>
                      <Button type="submit" className="w-full">
                          시작하기
                      </Button>
                  </form>
              </div>
          </Card>
      </div>
  )
}
