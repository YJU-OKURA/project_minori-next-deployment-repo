import {Navbar} from '@/src/components/navbar';

const ClassesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="flex w-full h-screen">
      <Navbar />
      <div className="w-full overflow-x-auto overflow-y-auto">{children}</div>
    </section>
  );
};

export default ClassesLayout;
