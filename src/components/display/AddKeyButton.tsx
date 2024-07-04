import { prisma } from "@/lib/prisma";
import { TranslationData, TypedTranslation } from "@/types";
import { revalidatePath } from "next/cache";
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
  console.log("lang", language);
  console.log("parent", parentKey);

  return (
    <Dialog>
      <DialogTrigger>Click to add a new key</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (data) => {
            "use server";

            const previous = (await prisma.translation.findUnique({
              where: {
                language,
              },
              select: {
                data: true,
              },
            })) as TypedTranslation;

            const newKey = data.get("value") as string;

            const parent = parentKey?.split(".") || [];
            console.log(parent)
            let newData = previous.data;

            for (const key of parent) {
              if (typeof newData[key] === "string") newData[key] = {};

              newData = newData[key];
            }

            newData[newKey] = "";

            await prisma.translation.update({
              where: {
                language,
              },
              data: {
                data: newData,
              },
            });

            return revalidatePath("/", "page");
          }}
          className="flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle>Add key</DialogTitle>
            <DialogDescription>Type the key to add</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input name="value" placeholder="Key" required />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
