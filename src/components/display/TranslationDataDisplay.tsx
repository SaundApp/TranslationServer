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
import { Input } from "../ui/input";
import AddKeyButton from "./AddKeyButton";

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
      <form action="/api/update" method="POST">
        <input type="text" value={language} hidden name="language" readOnly />
        <input type="text" value={name} hidden name="name" readOnly />
        <Input defaultValue={data} placeholder="Enter a value" name="value" />
        <button hidden type="submit">
          Update
        </button>
      </form>
    );

  return (
    <Table>
      <TableCaption>
        <AddKeyButton language={language} parentKey={name} />
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
            <TableCell className="justify-end flex gap-3">
              <form action="/api/convert" method="POST">
                <input
                  type="text"
                  value={language}
                  hidden
                  name="language"
                  readOnly
                />
                <input
                  type="text"
                  value={name ? `${name}.${item}` : item}
                  hidden
                  name="name"
                  readOnly
                />
                <Button type="submit">
                  Convert
                </Button>
              </form>

              <form action="/api/delete" method="POST">
                <input
                  type="text"
                  value={language}
                  hidden
                  name="language"
                  readOnly
                />
                <input
                  type="text"
                  value={name ? `${name}.${item}` : item}
                  hidden
                  name="name"
                  readOnly
                />
                <Button variant="destructive" type="submit">
                  Delete
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
