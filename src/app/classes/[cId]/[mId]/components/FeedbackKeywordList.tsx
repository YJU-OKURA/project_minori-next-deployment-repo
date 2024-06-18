'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import getKeywords from '@/src/api/feedback/getKeywords';
import {keyword} from '@/src/interfaces/feedback';
import getCheckRefer from '@/src/api/feedback/getCheckRefer';

const FeedbackKeywordList = ({cId, mId}: {cId: number; mId: number}) => {
  const [references, setReferences] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<keyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCheckRefer(cId, mId).then(res => {
      setReferences(res);
    });
  }, [cId, mId]);

  useEffect(() => {
    if (!references) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getKeywords(cId, mId).then(res => {
      console.log(res);
      setKeywords(res);
      setLoading(false);
    });
  }, [references, cId, mId]);

  console.log(keywords);

  return (
    <div className="flex justify-center">
      {references ? (
        loading ? (
          <div className="text-3xl p-3 font-semibold">
            <Image
              src="/gif/loading.gif"
              width={200}
              height={112}
              alt="gif"
              style={{width: '200px', height: '112px'}}
            ></Image>
          </div>
        ) : (
          keywords.map((keyword, index) => (
            <div className="px-3" key={index}>
              <div className="w-52 h-64 bg-green-200 rounded-lg p-4 border border-green-400">
                <div className="w-16 h-16 bg-green-500 rounded-full m-auto flex justify-center items-center text-4xl text-white">
                  P
                </div>
                <div className="p-1 font-semibold">{keyword.page}</div>
                <div className="font-semibold">KeyWord</div>
                <ul>
                  <li>{keyword.keywords[0]}</li>
                  <li>{keyword.keywords[1]}</li>
                  <li>{keyword.keywords[2]}</li>
                </ul>
              </div>
            </div>
          ))
        )
      ) : (
        <div className="text-blue-400">
          현재 질문 데이터가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
};

export default FeedbackKeywordList;
