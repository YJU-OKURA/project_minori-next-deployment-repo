'use client';

import {useState, useEffect} from 'react';
import {PostCard} from '../card';
import {ClassPost} from '../modal';
import classBoardAPI from '@/src/api/classBoard';
import {RoleProps} from '@/src/interfaces/_class';

const Post = ({
  managerRole,
  classId,
  userInfo,
  isOpen,
}: RoleProps & {isOpen: boolean}) => {
  const [classPosts, setClassPosts] = useState<
    {ID: number; Image: string; Title: string; IsAnnounced: Boolean}[]
  >([]);
  const [selectedPost, setSelectedPost] = useState<{
    ID: number;
    Image: string;
    Title: string;
    Content: string;
    IsAnnounced: Boolean;
  }>({ID: 0, Image: '', Title: '', Content: '', IsAnnounced: false});
  const [pageNum, setPageNum] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedNum, setSelectedNum] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = Math.ceil(totalPosts / 6);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  useEffect(() => {
    if (classId !== undefined && isOpen) {
      classBoardAPI.getClassBoardList(classId, pageNum, 6).then(posts => {
        if (Array.isArray(posts.data)) {
          setClassPosts(posts.data);
          if (pageNum === 1) {
            setTotalPosts(posts.total);
          }
        } else {
          console.error('getClassBoards did not return an array');
        }
      });
    }
  }, [classId, isOpen, pageNum]);

  const deletePost = async (postId: number) => {
    if (classId !== undefined && userInfo) {
      try {
        if (confirm('本当に投稿を削除しますか？')) {
          await classBoardAPI.deleteClassBoard(postId, classId, userInfo.id);
          alert('投稿は正常に削除されました！');
          const posts = await classBoardAPI.getClassBoardList(
            classId,
            pageNum,
            6
          );
          if (Array.isArray(posts.data)) {
            setClassPosts(posts.data);
          } else {
            console.error('getClassBoards did not return an array');
          }
        }
      } catch (error) {
        console.error(error);
        alert('投稿の削除に失敗しました');
      }
    } else {
      alert('投稿の削除に失敗しました');
    }
  };

  const calculateNewPageNum = (change: number) => {
    const newPageNum = pageNum + change;
    if (newPageNum < 1 || newPageNum > totalPages) {
      return pageNum;
    }
    return newPageNum;
  };

  const handlePageChange = (change: number) => {
    const newPageNum = calculateNewPageNum(change);
    setPageNum(newPageNum);
    setSelectedNum(newPageNum);
  };

  const renderPageButton = (label: string, handler: () => void) => {
    return totalPages === 0 ? null : (
      <button className="border w-20 rounded-lg me-4 " onClick={handler}>
        {label}
      </button>
    );
  };

  const renderPosts = () => {
    const nonAnnouncedPosts = classPosts.filter(post => !post.IsAnnounced);

    if (nonAnnouncedPosts.length === 0) {
      return (
        <div className="flex justify-center mt-2 w-full">
          <div className="flex w-1/2 border-4 justify-center items-center h-20">
            <h1 className="text-3xl font-semibold">
              現在、投稿が存在しません...
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className="ms-2 mt-4 grid place-items-center w-full">
        <div className="flex flex-wrap justify-start w-full">
          {classPosts.map((post, index) =>
            !post.IsAnnounced ? (
              <div
                className="flex items-center w-full"
                key={post.ID}
                onClick={async (event: React.MouseEvent) => {
                  event.stopPropagation();
                  setSelectedPost(await classBoardAPI.getClassBoard(post.ID));
                  setIsModalOpen(true);
                }}
              >
                <PostCard
                  imageSrc={post.Image}
                  postName={post.Title}
                  managerRole={managerRole}
                  zIndex={classPosts.length - index}
                  postId={post.ID}
                  deletePost={deletePost}
                />
              </div>
            ) : null
          )}
        </div>
        {isModalOpen && (
          <ClassPost
            setShowPostModal={setIsModalOpen}
            selectedPost={selectedPost}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {renderPosts()}
      <div className="flex justify-center mt-10">
        {renderPageButton('前へ', () => handlePageChange(-1))}
        {pages.map(page => (
          <button
            className={`border w-12 h-10 rounded-full me-2 ${
              selectedNum === page ? 'bg-blue-300' : 'bg-[#DAEFFD]'
            }`}
            key={page}
            onClick={() => handlePageChange(page - pageNum)}
          >
            {page}
          </button>
        ))}
        {renderPageButton('次へ', () => handlePageChange(1))}
      </div>
    </>
  );
};

export default Post;
