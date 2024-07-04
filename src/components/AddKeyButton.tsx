import { prisma } from "@/lib/prisma";
import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { redirect } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddKeyButton({ language }: { language: string }) {
  return (
    <Dialog>
      <DialogTrigger>Click to add a new key</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (data) => {
            "use server";

            await prisma.translation.update({
              where: {
                language,
              },
              data: {},
            });

            return redirect(`/?active=${language}`);
          }}
          className="flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle>Add key</DialogTitle>
            <DialogDescription>Type the key to add</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input name="key" placeholder="Key" />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
