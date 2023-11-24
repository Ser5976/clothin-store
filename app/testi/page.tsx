import prismadb from '@/lib/prismadb';
import { SizeType } from '../profile/get-size';
import { ImageForm } from './image-form';

const getSize = async (): Promise<SizeType[] | undefined> => {
  const res = await fetch('http://localhost:3000/api/size');
  if (!res.ok) {
    console.log('ОШИБКА');
    // throw new Error('Network response was not ok');
    return undefined;
  }
  return res.json();
};

const Testi = async () => {
  const colors = await prismadb.color.findMany();
  const size = await getSize();
  return (
    <div className=" flex min-h-screen flex-col items-center gap-8 p-24">
      <div className=" grid grid-cols-4 gap-2">
        {colors.map((color) => {
          return (
            <div
              key={color.id}
              className=" flex flex-col gap -[2px] w-[52px] h-[52px] items-center"
            >
              <div
                style={{ backgroundColor: color.value }}
                className={`w-[32px] h-[32px] rounded-full border`}
              ></div>

              <div className=" text-[12px] leading-[18px] font-normal">
                {color.name}
              </div>
            </div>
          );
        })}
      </div>
      <ImageForm />
      <div className="flex gap-2">
        {!size ? (
          <div>Уйня</div>
        ) : (
          size.map((item) => {
            return (
              <div className="  text-red-800 font-bold" key={item.id}>
                {item.value}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Testi;
