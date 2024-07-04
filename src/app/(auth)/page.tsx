import LanguagesBar from "@/components/LanguagesBar";
import OverviewPage from "@/components/pages/OverviewPage";
import LanguagePage from "@/components/pages/LanguagePage";

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
      {active ? <LanguagePage active={active} /> : <OverviewPage />}
    </main>
  );
}
