'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import getKeywords from '@/src/api/feedback/getKeywords';
import {keyword} from '@/src/interfaces/feedback';

const FeedbackKeywordList = () => {
  const [keywords, setKeywords] = useState<keyword[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getKeywords(1, 1).then(res => {
      console.log(res);
      setKeywords(res);
      setLoading(false);
    });
  }, []);
  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="text-3xl p-3 font-semibold">
          <Image
            src="/gif/loading.gif"
            width={200}
            height={200}
            alt="gif"
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
      )}
    </div>
  );
};

export default FeedbackKeywordList;
