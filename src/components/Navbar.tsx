import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import ImportFile from "./ImportFile";

export default async function Navbar({ active }: { active?: string }) {
  const session = await auth();

  return (
    <nav className="flex w-full border-b justify-between items-center gap-4 px-4 sm:py-5">
      <Link href="/" className="z-10">
        Saund
      </Link>
      <div className="flex gap-3 items-center">
        {active && <ImportFile language={active} />}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={session?.user.image || undefined}
                alt={session?.user.name || undefined}
              />
              <AvatarFallback>{session?.user.name || "?"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form
              action={async (_) => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className="w-full">
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
