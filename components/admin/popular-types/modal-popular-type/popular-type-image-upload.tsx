import '@uploadthing/react/styles.css';
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';
import { deleteImg } from '@/utils/utapi-delete';

// кастомный компонент заточенный для загрузки изображений на uploadthign
// используем компонет в reac hook form
type ImageType = { url: string; fileKey: string; id?: string };

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string; fileKey: string }) => void;
  onRemove: (value: { url: string; fileKey: string }) => void;
  value: ImageType;
  defaultImg: ImageType | undefined;
}

const PopularTypeImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  defaultImg,
}) => {
  return (
    <div className=" flex-col">
      <div className=" mb-4 flex flex-wrap gap-4">
        <div className="relative w-[150px] h-[150px] rounded-md overflow-hidden border p-4 ">
          <div className="z-10 absolute top-[4px] right-[4px]"></div>
          <div className=" relative w-[100px] h-[100px] rounded-md overflow-hidden">
            {(defaultImg || value.url) && (
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={value.url}
              />
            )}
          </div>
        </div>
      </div>
      <div className=" flex justify-start">
        <UploadButton
          content={{
            button({ ready }) {
              if (ready)
                return (
                  <div className=" text-xs text-center px-1">
                    You can upload only 1 image
                  </div>
                );

              return 'Getting ready...';
            },
            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready) return 'Checking what you allow';
              if (isUploading) return 'Seems like stuff is uploading';
              return ``;
            },
          }}
          endpoint="imageUploader"
          appearance={{
            button: {
              background: '#17696A',
              color: '#fff',
            },
            container: {},
          }}
          onClientUploadComplete={(res) => {
            //если пользователь выбирает картинки и не сохроняет их, они записываются в aploadthing и не удаляються,
            //поэтому нам нужно удалять их но, есть нюанс, мы не должны удалить дефолтную картинку,
            //она удалиться ,когда пользователь сохранит картинку
            if (defaultImg && defaultImg.url !== value.url) {
              //удаляем картинку из aploadthing
              const deleteAvatar = async () => await deleteImg(value.url);
              deleteAvatar();
            }
            //  UploadButton вовращает массив с объектами (данные по картинке),
            // берём только url(для показа картинки) и fileKey(для удаление )
            const imgArray = res ? res : [];
            const urlImg = imgArray.map((e) => {
              return { url: e.url, fileKey: e.key };
            });
            // если у нас есть данные в value,объединяем их

            onChange(urlImg[0]); //записывает в reac hook form данные
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

export default PopularTypeImageUpload;
