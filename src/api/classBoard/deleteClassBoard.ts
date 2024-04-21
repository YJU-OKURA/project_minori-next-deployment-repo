import req from '../apiUtils';

const DeleteClassBoard = async (bid: number, cid: number, uid: number) => {
  const response = await req(
    `/cb/${bid}?cid=${cid}&uid=${uid}`,
    'delete',
    'gin'
  );

  return response;
};

export default DeleteClassBoard;
