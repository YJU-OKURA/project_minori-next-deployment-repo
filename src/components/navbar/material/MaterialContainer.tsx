import {ChangeEvent, useState, KeyboardEvent} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import MaterialList from './MaterialList';
import getMaterial from '@/src/api/material/getMaterial';
import searchMaterial from '@/src/api/material/searchMaterial';
import {Material, ParamsProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const MaterialContainer = ({
  params,
  cId,
}: {
  params: ParamsProps;
  cId: string | null;
}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchMaterials, setSearchMaterials] = useState<Material[]>([]);
  const [keyWord, setKeyWord] = useState<string>('');
  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onLoadMore = () => {
    setHasMore(false);
    getMaterial(4, boardPage, 8).then(res => {
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

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      searchMaterial(1, keyWord, 1, 5).then(res => {
        console.log(res);
        setSearchMaterials(res);
      });
  };

  return (
    <div className="">
      {/* prompt - search */}
      <div className="w-full flex bg-white items-center mb-3 px-1">
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
          onKeyDown={handleKeyEnter}
        />
      </div>
      {/* Prompt - list */}
      <div className="h-[350px] overflow-auto">
        <InfiniteScroll
          pageStart={0}
          loadMore={onLoadMore}
          hasMore={hasMore}
          loader={<div key="unique"> loading...</div>}
          useWindow={false}
          threshold={20}
        >
          {materials ? (
            keyWord ? (
              <MaterialList
                materials={searchMaterials}
                params={params}
                cId={cId}
              />
            ) : (
              <MaterialList materials={materials} params={params} cId={cId} />
            )
          ) : null}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MaterialContainer;
