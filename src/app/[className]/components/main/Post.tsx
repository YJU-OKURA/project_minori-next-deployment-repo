'use client';

import {useState, useEffect} from 'react';
import {PostCard} from '../card';
import {ClassPost} from '../modal';
import getClassBoardList from '@/src/api/classBoard/getClassBoardList';
import getClassBoard from '@/src/api/classBoard/getClassBoard';
import DeleteClassBoard from '@/src/api/classBoard/deleteClassBoard';
import User from '@/src/model/User';
import {RoleProps} from '@/src/interfaces/_class';

const Post = ({
  managerRole,
  classId,
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
      getClassBoardList(classId, 1, 99).then(posts => {
        if (Array.isArray(posts.data)) {
          setTotalPosts(posts.total);
        } else {
          console.error('getClassBoards did not return an array');
        }
      });
    }
  }, [classId, isOpen]);

  useEffect(() => {
    if (classId !== undefined && isOpen) {
      getClassBoardList(classId, pageNum, 6).then(posts => {
        console.log(posts.data);
        if (Array.isArray(posts.data)) {
          setClassPosts(posts.data);
        } else {
          console.error('getClassBoards did not return an array');
        }
      });
    }
  }, [classId, isOpen, pageNum]);

  const deletePost = async (postId: number) => {
    if (classId !== undefined) {
      try {
        if (confirm('정말로 게시글을 삭제하시겠습니까?')) {
          await DeleteClassBoard(postId, classId, User.uid);
          alert('Post deleted successfully!');
          const posts = await getClassBoardList(classId, pageNum, 6);
          if (Array.isArray(posts.data)) {
            setClassPosts(posts.data);
          } else {
            console.error('getClassBoards did not return an array');
          }
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete post');
      }
    } else {
      alert('Failed to delete post');
    }
  };

  const handlePageChange = (page: number) => {
    setPageNum(page);
    setSelectedNum(page);
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      setSelectedNum(pageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
      setSelectedNum(pageNum + 1);
    }
  };

  const renderPosts = () => {
    if (classPosts.length === 0) {
      return (
        <div className="flex justify-center mt-2 w-full">
          <div className="flex w-1/2 border-4 justify-center items-center h-20">
            <h1 className="text-3xl font-semibold">
              현재 게시글이 존재하지 않습니다...
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
                className="flex justify-center items-center w-full md:w-1/3"
                key={post.ID}
                onClick={async (event: React.MouseEvent) => {
                  event.stopPropagation();
                  setSelectedPost(await getClassBoard(post.ID));
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
      <div className="flex justify-center">
        {totalPages === 0 ? null : (
          <button
            className="border w-20 rounded-lg me-4 "
            onClick={handlePrevPage}
          >
            이전
          </button>
        )}
        {pages.map(page => (
          <button
            className={`border w-12 h-10 rounded-full me-2 ${
              selectedNum === page ? 'bg-blue-300' : 'bg-[#DAEFFD]'
            }`}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        {totalPages === 0 ? null : (
          <button
            className="border w-20 rounded-lg ms-2 "
            onClick={handleNextPage}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
};

export default Post;
