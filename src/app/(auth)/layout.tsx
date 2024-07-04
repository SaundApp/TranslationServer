export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <p className="lg:hidden m-auto">This page is not available on mobile</p>
    </>
  );
}
