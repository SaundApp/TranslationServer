import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TypedTranslation } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import AddKeyButton from "./AddKeyButton";

export default async function LanguagePage({ active }: { active: string }) {
  const translation = (await prisma.translation.findUnique({
    where: {
      language: active,
    },
  })) as TypedTranslation;

  return (
    <Table>
      <TableCaption>
        <AddKeyButton language={active} />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Key</TableHead>
          <TableHead>Content</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(translation.data).map((item) => (
          <TableRow key={item}>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
