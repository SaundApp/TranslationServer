import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddKeyButton({
  language,
  parentKey,
}: {
  language: string;
  parentKey?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>Click to add a new key</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          action="/api/update"
          method="POST"
          className="flex flex-col gap-3"
        >
          <input type="text" value={language} hidden name="language" readOnly />
          <input type="text" value="" hidden name="value" readOnly />
          <input type="text" value={parentKey} hidden name="parentKey" readOnly />

          <DialogHeader>
            <DialogTitle>Add key</DialogTitle>
            <DialogDescription>Type the key to add</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input name="name" placeholder="Key" required />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
