import Image from 'next/image';
import {Notice, Post, Schedule} from '.';
import {RoleProps} from '@/src/interfaces/group';
import icons from '@/public/svgs/group';

const Main = ({managerRole}: RoleProps) => {
  const mainSections = [
    {title: 'Notice', component: <Notice managerRole={managerRole} />},
    {title: 'Schedule', component: <Schedule managerRole={managerRole} />},
    {title: 'Posts', component: <Post managerRole={managerRole} />},
  ];
  return (
    <>
      <div className="mt-2 w-11/12">
        {mainSections.map((section, index) => (
          <div key={index}>
            <div className="flex">
              <Image
                className="me-2"
                src={icons.dropdownButton}
                alt={'dropdown'}
                width={24}
                height={24}
              />
              <div className="flex w-full justify-between">
                <h3 className="text-xl font-bold">{section.title}</h3>
                {managerRole &&
                  (section.title === 'Schedule' ||
                    section.title === 'Posts') && (
                    <Image
                      src={icons.addButton}
                      alt={'addButton'}
                      width={24}
                      height={24}
                    />
                  )}
              </div>
            </div>
            <div className="mb-10">{section.component}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
