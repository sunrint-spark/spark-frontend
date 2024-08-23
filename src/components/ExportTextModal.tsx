import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import useLBRealtimeStore from "@/context/store";

export default function ExportTextModal() {
    const { nodes,  } = useLBRealtimeStore();
    const filteredUniqueNodes = nodes
        .filter(node => node.type === 'aiStartupNode')
        .filter((node, index, self) =>
            index === self.findIndex((n) => n.id === node.id)
        );

    return <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>텍스트 정리하기</DialogTitle>
                <DialogDescription>
                    원하는 노드를 선택하면 텍스트로 내보낼 수 있습니다.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="노드 선택하기" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredUniqueNodes.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.data.text as string}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}