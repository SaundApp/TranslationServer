import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";

export default async function SignInPage() {
  return (
    <div className="m-auto">
      <form
        action={async () => {
          "use server";
          try {
            await signIn("github");

            return redirect("/");
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`?error=${error.type}`);
            }

            throw error;
          }
        }}
      >
        <Button type="submit">Sign in with GitHub</Button>
      </form>
    </div>
  );
}
