import prismadb from '@/lib/prismadb';
import { ImageForm } from './image-form';

const Testi = async () => {
  const colors = await prismadb.color.findMany();

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
    </div>
  );
};
export default Testi;
