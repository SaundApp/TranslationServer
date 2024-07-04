import { prisma } from "@/lib/prisma";
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
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LanguagesBar({ active }: { active?: string }) {
  const languages = await prisma.translation.findMany({
    select: {
      language: true,
      languageName: true,
    },
  });

  return (
    <div className="absolute top-0 left-0 h-screen w-64 p-6 pt-24 flex flex-col gap-3 border-r">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Add language</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={async (data) => {
              "use server";

              try {
                await prisma.translation.create({
                  data: {
                    language: (data.get("id") as string).toLowerCase(),
                    languageName: data.get("name") as string,
                    data: {},
                  },
                });
              } catch (e) {
                return redirect("/?error=Language already exists");
              }

              return redirect("/");
            }}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>Add language</DialogTitle>
              <DialogDescription>
                Type the id and name of the new language to add
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                name="id"
                placeholder="Language ID"
                minLength={2}
                maxLength={2}
              />
              <Input name="name" placeholder="Language Name" />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {languages.map((language) => (
        <Button
          variant={active === language.language ? "secondary" : "outline"}
          className="w-full"
          key={language.language}
          asChild
        >
          <Link href={`/?active=${language.language}`}>
            {language.languageName}
          </Link>
        </Button>
      ))}
    </div>
  );
}
