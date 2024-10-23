'use client';
import {ChangeEvent, useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
// import Link from 'next/link';
import Image from 'next/image';
// import {useParams} from 'next/navigation';
import MaterialForm from './MaterialForm';
import MaterialList from './MaterialList';
import getMaterial from '@/src/api/material/getMaterial';
import searchMaterial from '@/src/api/material/searchMaterial';
import useDebounce from '@/src/hooks/useDebounce';
import {Material} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';
import userState from '@/src/recoil/atoms/userState';
import {useRecoilValue} from 'recoil';
// import test from '@/public/images/navbar'; // 学校のロゴイメージ

const MaterialContainer = ({cId, mId}: {cId: string; mId: string}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchMaterials, setSearchMaterials] = useState<Material[]>([]);
  const [keyWord, setKeyWord] = useState<string>('');
  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  const debounceVal = useDebounce(keyWord, 500);

  useEffect(() => {
    if (debounceVal) {
      searchMaterial(parseInt(cId), debounceVal, 1, 5).then(res => {
        setSearchMaterials(res);
      });
    }
  }, [debounceVal]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // 클라이언트에서만 렌더링됨
  }, []);

  if (!isMounted) {
    return null; // 서버에서 렌더링하지 않음
  }

  // useEffect(() => {
  //   setMaterials([]);
  //   setBoardPage(1);
  //   onLoadMore();
  // }, [param.cId]);

  const onLoadMore = () => {
    setHasMore(false);
    getMaterial(parseInt(cId), boardPage, 8)
      .then(res => {
        if (res.length === 0) {
          setHasMore(false);
        } else {
          setMaterials(prevMaterials => [
            ...(prevMaterials ? prevMaterials : []),
            ...res,
          ]);
          setBoardPage(prevBoardPage => prevBoardPage + 1);
          setHasMore(true);
        }
      })
      .catch(() => {
        console.log('클래스에 접속된 상태가 아닙니다');
      });
  };

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setKeyWord(e.target.value);
    }
    if (e.target.value === '') {
      setSearchMaterials([]);
      setKeyWord('');
    }
  };

  return (
    // <div className="relative h-full flex flex-col">
    //   {/* <div className="absolute top-[20%] m-auto">
    //     <Image
    //       src={test.school}
    //       width={250}
    //       height={250}
    //       alt="logo"
    //       className="opacity-5"
    //     />
    //   </div> */}
    //   {param.cId && (
    //     <>
    //       <div className="w-full flex-1 h-[calc(100%-82px)]">
    //         <div className="w-full flex justify-between items-center mb-[8px]">
    //           {/* <p className="text-zinc-400">資料</p> */}
    //           <div
    //             className="text-end bg-blue-500 w-6 h-6 flex justify-center items-center rounded-lg"
    //             onClick={() => setIsOpen(true)}
    //           >
    //             <Image src={icons.plus} width={30} height={30} alt="plus" />
    //           </div>
    //         </div>
    //         {isOpen && <MaterialForm setIsOpen={setIsOpen} cId={param.cId} />}
    //         {/* prompt - search */}
    //         <div className="w-full h-10 flex bg-gray-100 rounded-lg items-center mb-[8px] overflow-hidden">
    //           <div className="w-8 h-8 m-1">
    //             <Image
    //               src={icons.search}
    //               alt="icon"
    //               width={32}
    //               height={32}
    //               className="min-w-8 h-8 opacity-70"
    //             />
    //           </div>
    //           <input
    //             type="text"
    //             className="w-full p-2 border-0 bg-inherit outline-none"
    //             placeholder="検索"
    //             onChange={handleInputText}
    //           />
    //         </div>
    //         {/* Prompt - list */}
    //         <div className="h-[calc(100%-72px)] overflow-auto">
    //           <InfiniteScroll
    //             pageStart={0}
    //             loadMore={onLoadMore}
    //             hasMore={hasMore}
    //             loader={<div key="unique"> loading...</div>}
    //             useWindow={false}
    //             threshold={20}
    //           >
    //             {materials && keyWord ? (
    //               <MaterialList materials={searchMaterials} cId={param.cId} />
    //             ) : (
    //               <MaterialList materials={materials} cId={param.cId} />
    //             )}
    //           </InfiniteScroll>
    //         </div>
    //       </div>
    //       <div className="flex-none h-8"></div>
    //       {/* Exit */}
    //       <div className="flex-none h-[50px] z-10">
    //         <div className="flex pt-[10px]">
    //           <Image
    //             src={icons.door}
    //             alt="icon"
    //             width={30}
    //             height={30}
    //             className="w-6 h-6 mr-2"
    //           ></Image>
    //           {param.mId ? (
    //             <Link href={`/classes/${param.cId}`}>フロンプトを出る</Link>
    //           ) : (
    //             <Link href="/classes">クラスを出る</Link>
    //           )}
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="w-full h-full">
      {/* search */}
      {cId && (
        <div className="w-[calc(100%-40px)] h-[calc(100%-100px)] flex flex-col gap-4 m-auto my-3">
          <div className="flex items-center gap-4 py-1 bg-gray-300 rounded-lg">
            <Image
              src={icons.search}
              alt="icon"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full m-2 opacity-30"
            />
            <input
              type="text"
              placeholder="search"
              className="w-[calc(100%-64px)] bg-inherit outline-none"
              onChange={handleInputText}
            />
          </div>
          {/* FileAdd */}
          {user.role_id === 'ADMIN' ? (
            <div
              className="w-full h-16 bg-black rounded-lg border-2 border-gray-600 border-dashed flex flex-col justify-center items-center bg-opacity-30 text-white font-semibold"
              onClick={() => setIsOpen(true)}
            >
              <span>New Material</span>
              <span>Pdf File</span>
            </div>
          ) : null}
          {isOpen && <MaterialForm setIsOpen={setIsOpen} cId={cId} />}
          {/* FileList */}
          {/* <div className="flex">
            <div className="w-6 h-6 m-1 bg-black rounded-full"></div>
            <div>document.pdf</div>
            </div> */}
          <div className="h-full overflow-auto">
            <InfiniteScroll
              pageStart={1}
              loadMore={onLoadMore}
              hasMore={hasMore}
              loader={<div key="unique"> loading...</div>}
              useWindow={false}
              threshold={20}
            >
              {materials && keyWord ? (
                <MaterialList materials={searchMaterials} cId={cId} mId={mId} />
              ) : (
                <MaterialList materials={materials} cId={cId} mId={mId} />
              )}
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialContainer;
