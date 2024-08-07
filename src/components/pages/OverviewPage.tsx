import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

function checkForWarnings(data: any) {
  const warnings = [];
  const english = data.find(
    (translation: any) => translation.language === "en"
  );

  if (!english) {
    warnings.push("No English translation found");
    return warnings;
  }

  for (const translation of data) {
    const missingKeys = [];

    for (const key in english.data) {
      if (typeof english.data[key] === "object") {
        for (const childKey in english.data[key]) {
          if (!translation.data[key]?.[childKey]) {
            missingKeys.push(`${key}.${childKey}`);
          }
        }
      } else {
        if (!translation.data[key]) {
          missingKeys.push(key);
        }
      }
    }

    if (missingKeys.length > 0) {
      warnings.push(
        `Missing keys in ${translation.language}: ${missingKeys.join(", ")}`
      );
    }
  }

  return warnings;
}

export default async function OverviewPage() {
  const session = await auth();
  const translations = await prisma.translation.findMany({});

  return (
    <div className="p-6 grid gap-3 grid-cols-3">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Welcome back, {session?.user.name}. <br /> There are
            <code>{translations.length}</code> languages available with{" "}
            <code>
              {Math.max(
                ...translations.map(
                  ({ data }: { data: any }) => Object.keys(data).length
                )
              )}
            </code>{" "}
            keys.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Warnings</CardTitle>
          <CardContent>
            <ul className="list-disc text-muted-foreground">
              {checkForWarnings(translations).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
              {checkForWarnings(translations).length === 0 && (
                <li>No warnings found</li>
              )}
            </ul>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
