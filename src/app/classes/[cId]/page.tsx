'use client';

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {Main} from './components/main';
import {Member} from './components/member';
import {Alarm} from './components/alarm';
import classAPI from '@/src/api/_class';
import getUserInfo from '@/src/api/classUser/getUserInfo';
import {User} from '@/src/interfaces/user';
import icons from '@/public/svgs/_class';

const ClassMain = () => {
  const user = useRecoilValue(userState) as User;
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classSecret, setClassSecret] = useState('');
  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    image: '',
    nickname: '',
  });
  const [managerRole, setManagerRole] = useState('');
  const classTab = managerRole ? 'メンバーリスト' : 'アラーム';
  const tabs = ['メイン', classTab];
  const searchParams = useParams();
  const classId = Number(searchParams.cId);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    メイン: (
      <Main managerRole={managerRole} classId={classId} userInfo={userInfo} />
    ),
    メンバーリスト: (
      <Member managerRole={managerRole} classId={classId} userInfo={userInfo} />
    ),
    アラーム: <Alarm />,
  };
  const fetchData = async () => {
    if (classId !== undefined) {
      const classData = await classAPI.getClassInfo(classId);
      const userData = await getUserInfo(user.id, classId);
      setClassCode(classData.data.classCode.code);
      setClassSecret(classData.data.classCode.secret);
      setClassName(classData.data.class.Name);
      setUserInfo(userData);
      setClassDescription(classData.data.class.Description);
      setManagerRole(userData.role);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label}がクリップボードに保存されました`);
    } catch (err) {
      console.error('クリップボードへの保存に失敗:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId]);
  return (
    <>
      <div className="ms-10">
        <div className="mt-9">
          <div className="flex items-center justify-between me-10">
            <h1 className="text-black text-5xl font-medium">{className}</h1>
          </div>
          {managerRole === 'ADMIN' || managerRole === 'ASSISTANT' ? (
            <>
              <div className="rounded-lg ps-4 mt-4 bg-gray-200 w-1/5 h-20 flex flex-col justify-center shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-600">クラスコード</span>
                  <span className="mr-4 text-gray-800">{classCode}</span>
                  <Image
                    src={icons.copy}
                    alt={'copy'}
                    width={24}
                    height={24}
                    onClick={() => copyToClipboard(classCode, 'クラスコード')}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-gray-600">パスワード</span>
                  <span className="mr-4 text-gray-800">{classSecret}</span>
                  <Image
                    src={icons.copy}
                    alt={'copy'}
                    width={24}
                    height={24}
                    onClick={() => copyToClipboard(classSecret, 'パスワード')}
                    className="mr-2"
                  />
                </div>
              </div>
              <p className="mt-4 text-gray-400">{classDescription}</p>
            </>
          ) : (
            <p className="mt-4 text-black">{classDescription}</p>
          )}
          <div className="border border-gray-200 w-11/12 mt-4 "></div>
        </div>
        <div>
          <Dashboard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />
          <div className="flex flex-wrap ms-2 mt-6 ">
            <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassMain;
