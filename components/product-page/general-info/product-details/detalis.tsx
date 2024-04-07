import { FC } from 'react';

type DetailsProps = {
  detalis: string;
};

export const Detalis: FC<DetailsProps> = ({ detalis }) => {
  return (
    <div className=" col-span-3 max-md:col-span-2">
      <div className="text-gray-700 text-base leading-relaxed w-[85%]">
        {detalis}
      </div>
    </div>
  );
};
