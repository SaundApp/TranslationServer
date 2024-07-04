import LanguagesBar from "@/components/LanguagesBar";
import OverviewPage from "@/components/pages/OverviewPage";
import LanguagePage from "@/components/pages/LanguagePage";
import Navbar from "@/components/Navbar";

export default function Home({
  searchParams: { active },
}: {
  searchParams: {
    active?: string;
  };
}) {
  return (
    <>
      <Navbar active={active} />
      <main className="hidden lg:flex gap-3">
        <LanguagesBar active={active} />
        {active ? <LanguagePage active={active} /> : <OverviewPage />}
      </main>
    </>
  );
}
