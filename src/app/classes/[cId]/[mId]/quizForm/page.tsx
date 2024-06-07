import QuizForm from './components';

const Page = (props: {
  params: {cId: number; mId: number};
  searchParams: {mId: number};
}) => {
  return (
    <div className="w-full p-5">
      <QuizForm {...props} />
    </div>
  );
};

export default Page;
