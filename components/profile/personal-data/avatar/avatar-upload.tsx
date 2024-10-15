'use client';
import '@uploadthing/react/styles.css';
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';
import { UserCircle2 } from 'lucide-react';
import { deleteImg } from '@/utils/utapi-delete';

// кастомный компонент заточенный для загрузки изображений на uploadthign
// используем компонет в reac hook form
interface AvatarUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  urlAvatar: string;
  defaultAvatar: string | undefined;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  onChange,
  urlAvatar,
  defaultAvatar,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {urlAvatar === '' ? (
        <div>
          <UserCircle2 size={150} color=" black" strokeWidth={1} />
        </div>
      ) : (
        <Image alt="Image" src={urlAvatar} width={150} height={150} />
      )}

      <div className=" flex justify-center">
        <UploadButton
          content={{
            button({ ready }) {
              if (ready) return <div>Upload image</div>;

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
            if (defaultAvatar && defaultAvatar !== urlAvatar) {
              // получаем fileKey
              const fileKey = urlAvatar.substring(
                urlAvatar.lastIndexOf('/') + 1
              );
              console.log('fileKey:', fileKey);
              const deleteAvatar = async () => await deleteImg(fileKey);
              deleteAvatar();
            }

            //  UploadButton вовращает массив с объектами (данные по картинке),
            // берём только url(для показа картинки)
            const imgArray = res ? res : undefined;
            const avatar = imgArray?.map((e) => {
              return e.url;
            });
            onChange(avatar ? avatar[0] : ''); //записывает в reac hook form данные
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

export default AvatarUpload;
