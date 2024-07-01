'use client';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useParams} from 'next/navigation';
import postMaterial from '@/src/api/material/postMaterial';
import patchMaterial from '@/src/api/material/patchMaterial';
import {FormProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar/prompt';

const MaterialForm = ({setIsOpen, editData, cId}: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [material, setMaterial] = useState<File>();
  const [materialName, setMaterialName] = useState<string>('');
  const params = useParams<{cId: string}>();

  useEffect(() => {
    if (editData) {
      setMaterialName(editData.name);
    }
  }, []);

  const handleEnterName = (e: ChangeEvent<HTMLInputElement>) => {
    setMaterialName(e.target.value);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMaterial(file[0]);
    }
  };

  const handleClickButton = () => {
    console.log(material, materialName);
    if (material && materialName) {
      postMaterial(parseInt(params.cId), materialName, material).then(() => {
        setIsOpen(false);
        location.reload();
      });
    } else {
      alert('모든 항목을 입력해주세요');
    }
  };

  const handleClickEdit = () => {
    console.log('edit');
    if (editData)
      patchMaterial(
        parseInt(cId),
        parseInt(editData.id),
        material,
        materialName
      ).then(() => {
        setIsOpen(false);
        location.reload();
      });
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className=" bg-white rounded-lg w-[600px] h-[600px] p-12 box-border">
          <div className="w-full h-full flex box-border">
            <div className="flex flex-col space-y-4 h-full w-full">
              <div>
                <div className="text-3xl font-bold">プロンプト生成</div>
                <div className="text-gray-500 py-1">
                  ご希望のファイルを追加してください。
                </div>
              </div>
              <div className="py-1">
                <div className="pb-2 font-semibold">プロンプト名</div>
                <input
                  type="text"
                  className="w-full border-2 p-2 rounded"
                  placeholder="プロンプト名を入力してください"
                  value={materialName}
                  onChange={handleEnterName}
                />
              </div>
              <div className="flex flex-col h-2/3">
                <div className="pb-2 font-semibold">ファイルの追加</div>
                <div
                  className="w-full h-[230px] flex items-center justify-center bg-gray-50 text-center p-8 border-dashed border-2 border-gray-300"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <div>
                    <div className="pb-4">
                      <Image
                        src={icons.cloud}
                        alt="cloud"
                        width={60}
                        height={60}
                        className="m-auto "
                      />
                    </div>
                    <div className="font-medium">
                      PDFファイルを追加してください
                    </div>
                    <div className="text-xs text-gray-400">
                      対応ファイル形式: PDF
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      onChange={handleChangeFile}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <button
                  className="bg-gray-100 py-2 px-4  rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {'< '}戻る
                </button>
                {editData ? (
                  <button
                    className="bg-indigo-600 text-white py-2 px-3 rounded"
                    onClick={handleClickEdit}
                  >
                    資料修正
                  </button>
                ) : (
                  <button
                    className="bg-indigo-600 text-white py-2 px-3 rounded"
                    onClick={handleClickButton}
                  >
                    資料作成
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
