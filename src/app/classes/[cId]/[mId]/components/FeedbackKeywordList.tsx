'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import getKeywords from '@/src/api/feedback/getKeywords';
import {keyword} from '@/src/interfaces/feedback';
import getCheckRefer from '@/src/api/feedback/getCheckRefer';
import gifs from '@/public/gif';

const FeedbackKeywordList = ({cId, mId}: {cId: number; mId: number}) => {
  const [references, setReferences] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<keyword[]>([]);
  const [keyWord, setKeyWord] = useState<keyword | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(keywords.length);

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
      if (Array.isArray(res)) {
        setKeywords(res);
      } else if (res.length === 1) {
        setKeyWord(res[0]);
      } else {
        setKeyWord(res);
      }
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
              src={gifs.eclipse}
              width={200}
              height={112}
              alt="gif"
              style={{width: '200px', height: '112px'}}
            ></Image>
          </div>
        ) : keyWord ? (
          <div className="px-3">
            <div className="w-52 h-64 bg-green-200 rounded-lg p-4 border border-green-400">
              <div className="w-16 h-16 bg-green-500 rounded-full m-auto flex justify-center items-center text-4xl text-white">
                P
              </div>
              <div className="p-1 font-semibold">{keyWord.page}</div>
              <div className="font-semibold">KeyWord</div>
              <ul>
                <li>{keyWord.keywords[0]}</li>
                <li>{keyWord.keywords[1]}</li>
                <li>{keyWord.keywords[2]}</li>
              </ul>
            </div>
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
        <div className="text-blue-400">現在、質問データが存在しません。</div>
      )}
    </div>
  );
};

export default FeedbackKeywordList;
