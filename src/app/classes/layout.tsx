import {Navbar} from '@/src/components/navbar';

export default function ClassesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-screen">
      <Navbar />
      <div className="w-full overflow-x-auto overflow-y-auto">{children}</div>
    </section>
  );
}
