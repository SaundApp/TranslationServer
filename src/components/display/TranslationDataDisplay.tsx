import { Input } from "../ui/input";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
// import AddKeyButton from "./AddKeyButton";

export default async function TranslationDataDisplay({
  data,
  name,
  language,
}: {
  language: string;
  name?: string;
  data: any | string;
}) {
  if (typeof data === "string")
    return (
      <form
        action={async (form) => {
          "use server";

          const previous = await prisma.translation.findUnique({
            where: {
              language,
            },
            select: {
              data: true,
            },
          });

          const updatedData = previous!.data as any;
          const parent = name
            ? name.split(".").reduce((acc, key) => acc[key], updatedData)
            : updatedData;

          parent[form.get("value") as string] = "";

          await prisma.translation.update({
            where: {
              language,
            },
            data: {
              data: updatedData,
            },
          });
        }}
      >
        <Input defaultValue={data} placeholder="Enter a value" name="value" />
      </form>
    );

  console.log(data);

  return (
    <Table>
      <TableCaption>
        {/* <AddKeyButton language={language} parentKey={name} /> */}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Key</TableHead>
          <TableHead>Content</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(data).map((item) => (
          <TableRow key={item}>
            <TableCell>{item}</TableCell>
            <TableCell>
              <TranslationDataDisplay
                language={language}
                name={name ? `${name}.${item}` : item}
                data={data[item]}
              />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
