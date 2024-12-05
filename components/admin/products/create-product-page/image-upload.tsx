'use client';
import '@uploadthing/react/styles.css';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import { UploadButton } from '@/utils/uploadthing';
import { deleteImg } from '@/utils/utapi-delete';

// кастомный компонент заточенный для загрузки изображений на uploadthign
// используем компонет в reac hook form
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string; fileKey: string }[]) => void;
  onRemove: (value: { url: string; fileKey: string }[]) => void;
  value: { url: string; fileKey: string; id?: string }[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  // костыль для удаление картинки из reac hook form
  // фильтруем value reac hook form,удаляем выбранный объект
  // передаем  в onRemove,а она уже в reac hook form при помощи onChange перезаписывает value
  // и перезаписанное value возвращается к нам
  const remove = (fileKey: string) => {
    const newUrl = value.filter((value) => value.fileKey !== fileKey);
    return newUrl;
  };
  console.log('Value:', value);
  return (
    <div className=" flex-col">
      <div className=" mb-4 flex flex-wrap gap-4">
        {value.map((url) => {
          return (
            <div
              key={url.fileKey}
              className="relative w-[150px] h-[150px] rounded-md overflow-hidden border p-4 "
            >
              <div className="z-10 absolute top-[4px] right-[4px]">
                <Trash
                  className="h-[12px] w-[12px] cursor-pointer"
                  color="red"
                  onClick={async () => {
                    onRemove(remove(url.fileKey)); // удаляем картинку из reac hook form
                    await deleteImg(url.fileKey); // удаляем картинку из uploadthign
                    // url.id &&  запрос на удаление картинки из бызы данных
                  }}
                />
              </div>
              <div className=" relative w-[100px] h-[100px] rounded-md overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={url.url}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className=" flex justify-start">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: {
              background: '#17696A',
              color: '#fff',
            },
            container: {},
          }}
          onClientUploadComplete={(res) => {
            //  UploadButton вовращает массив с объектами (данные по картинке),
            // берём только url(для показа картинки) и fileKey(для удаление )
            const imgArray = res ? res : [];
            const urlImg = imgArray.map((e) => {
              return { url: e.url, fileKey: e.key };
            });
            // если у нас есть данные в value,объединяем их
            const combinedArray = urlImg.concat(value);
            onChange(combinedArray); //записывает в reac hook form данные
            console.log('Files: ', res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
