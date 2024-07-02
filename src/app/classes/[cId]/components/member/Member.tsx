import {useEffect, useState} from 'react';
import {MemberCard} from '../card';
import classAPI from '@/src/api/_class';
import getClassUsers from '@/src/api/classUser/getClassUsers';
import {RoleProps} from '@/src/interfaces/_class';

const Member = ({classId}: RoleProps) => {
  const [classInfo, setClassInfo] = useState<{Limitation: number} | null>(null);
  const [adminInfo, setAdminInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [assistantInfo, setAssistantInfo] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState([]);
  const [memberCount, setMemberCount] = useState(0);

  const fetchAllUserInfo = async () => {
    const classInfoPromise = classAPI.getClassInfo(classId ?? 0);
    const adminInfoPromise = getClassUsers(classId ?? 0, 'ADMIN');
    const userInfoPromise = getClassUsers(classId ?? 0, 'USER');
    const assistantInfoPromise = getClassUsers(classId ?? 0, 'ASSISTANT');
    const applicantInfoPromise = getClassUsers(classId ?? 0, 'APPLICANT');

    const [
      classInfoResult,
      adminInfoResult,
      userInfoResult,
      assistantInfoResult,
      applicantInfoResult,
    ] = await Promise.all([
      classInfoPromise,
      adminInfoPromise,
      userInfoPromise,
      assistantInfoPromise,
      applicantInfoPromise,
    ]);

    setClassInfo(classInfoResult.data.class);
    setAdminInfo(adminInfoResult);
    setUserInfo(userInfoResult);
    setAssistantInfo(assistantInfoResult);
    setApplicantInfo(applicantInfoResult);
    setMemberCount(
      adminInfoResult.length +
        userInfoResult.length +
        assistantInfoResult.length
    );
  };

  useEffect(() => {
    fetchAllUserInfo();
  }, []);

  return (
    <>
      <div className="w-11/12">
        <div className="ps-1">
          <p className="text-2xl my-2 font-bold">登録済みメンバーリスト</p>
          <p className="text-4xl my-1 font-semibold">
            {memberCount} / {classInfo?.Limitation}
          </p>
          <p className="text-xl text-emerald-500">
            {classInfo?.Limitation
              ? `定員率 ${(memberCount / classInfo.Limitation) * 100}%`
              : '定員情報なし'}
          </p>
        </div>
        <div className="w-full">
          <MemberCard
            adminInfo={adminInfo}
            assistantInfo={assistantInfo}
            userInfo={userInfo}
          />
        </div>
        <div className="ps-1 mt-10">
          <p className="text-2xl my-2 font-bold">加入申請者</p>
          <p className="text-4xl my-4 font-semibold">
            {applicantInfo.length === 0
              ? '申請したユーザーがいません'
              : applicantInfo.length + '名'}
          </p>
        </div>
        <div className="w-full">
          <MemberCard applicantInfo={applicantInfo} />
        </div>
      </div>
    </>
  );
};

export default Member;
