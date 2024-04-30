export default function MaterialLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="flex w-full h-full">{children}</section>;
}
