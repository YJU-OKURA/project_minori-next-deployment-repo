'use client';
import {ChangeEvent, useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'next/link';
import Image from 'next/image';
import {useParams} from 'next/navigation';
import MaterialForm from './MaterialForm';
import MaterialList from './MaterialList';
import getMaterial from '@/src/api/material/getMaterial';
import searchMaterial from '@/src/api/material/searchMaterial';
import useDebounce from '@/src/hooks/useDebounce';
import {Material} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';
import test from '@/public/images/navbar';

const MaterialContainer = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchMaterials, setSearchMaterials] = useState<Material[]>([]);
  const [keyWord, setKeyWord] = useState<string>('');
  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const param = useParams<{cId: string; mId: string}>();

  const debounceVal = useDebounce(keyWord, 500);

  useEffect(() => {
    if (debounceVal) {
      searchMaterial(parseInt(param.cId), debounceVal, 1, 5).then(res => {
        setSearchMaterials(res);
      });
    }
  }, [debounceVal]);

  useEffect(() => {
    setMaterials([]);
    setBoardPage(1);
    onLoadMore();
  }, [param.cId]);

  const onLoadMore = () => {
    setHasMore(false);
    getMaterial(parseInt(param.cId), boardPage, 8)
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
    <div className="relative h-full flex flex-col">
      <div className="absolute top-[20%] m-auto">
        <Image
          src={test.school}
          width={250}
          height={250}
          alt="logo"
          className="opacity-5"
        />
      </div>
      {param.cId && (
        <>
          <div className="w-full flex-1 h-[calc(100%-82px)]">
            <div className="w-full flex justify-between items-center mb-[8px]">
              <p className="text-zinc-400">자료</p>
              <div
                className="text-end bg-blue-500 w-6 h-6 flex justify-center items-center rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                <Image src={icons.plus} width={30} height={30} alt="plus" />
              </div>
            </div>
            {isOpen && <MaterialForm setIsOpen={setIsOpen} cId={param.cId} />}
            {/* prompt - search */}
            <div className="w-full flex bg-white items-center mb-[8px] px-1">
              <Image
                src={icons.search}
                alt="icon"
                width={20}
                height={20}
                className="w-5 h-5 opacity-50"
              />
              <input
                type="text"
                className="w-full p-1 border-0 outline-none"
                placeholder="Search"
                onChange={handleInputText}
              />
            </div>
            {/* Prompt - list */}
            <div className="h-[calc(100%-72px)] overflow-auto">
              <InfiniteScroll
                pageStart={0}
                loadMore={onLoadMore}
                hasMore={hasMore}
                loader={<div key="unique"> loading...</div>}
                useWindow={false}
                threshold={20}
              >
                {materials && keyWord ? (
                  <MaterialList materials={searchMaterials} cId={param.cId} />
                ) : (
                  <MaterialList materials={materials} cId={param.cId} />
                )}
              </InfiniteScroll>
            </div>
          </div>
          <div className="flex-none h-8"></div>
          {/* Exit */}
          <div className="flex-none h-[50px] bg-gray-50 z-10">
            <div className="flex pt-[10px]">
              <Image
                src={icons.door}
                alt="icon"
                width={30}
                height={30}
                className="w-6 h-6 mr-2"
              ></Image>
              {param.mId ? (
                <Link href={`/classes/${param.cId}`}>프롬프트 떠나기</Link>
              ) : (
                <Link href="/classes">클래스 떠나기</Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialContainer;
