import LanguagesBar from "@/components/LanguagesBar";

export default function Home({
  searchParams: { active },
}: {
  searchParams: {
    active?: string;
  };
}) {
  return (
    <main className="flex gap-3">
      <LanguagesBar active={active} />
    </main>
  );
}
