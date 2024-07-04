import { auth } from "@/lib/auth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function ImportFile({ language }: { language: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Import json</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (form) => {
            "use server";

            const session = await auth();
            if (!session?.user?.id) return;

            const file = form.get("file") as File;
            const data = await file.text();

            try {
              await prisma.translation.update({
                where: { language },
                data: {
                  data: JSON.parse(data),
                },
              });
            } catch (e) {
              return redirect("/?error=Invalid json file");
            }

            revalidatePath("/", "page");
            return redirect("/");
          }}
          className="flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle>Import file</DialogTitle>
            <DialogDescription>Import a json file to proceed</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input type="file" name="file" />
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
