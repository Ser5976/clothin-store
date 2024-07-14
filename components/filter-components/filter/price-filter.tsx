import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// здесь более сложная ситуация, поэтому для фильтрации используем состояние, которое синхронизируем с адресной строкой
export const PriceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const minPrice = Math.min(price[0], price[1]);
  const maxPrice = Math.max(price[0], price[1]);

  //используем setTimeout(), чтобы не делать кучу запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (price[0] > 0) {
        if (searchParams.get('minPrice')) {
          params.set('minPrice', String(price[0]));
        } else {
          params.append('minPrice', String(price[0]));
        }
      } else {
        if (searchParams.get('minPrice')) {
          params.delete('minPrice');
        }
      }
      if (price[1] < 1000) {
        if (searchParams.get('maxPrice')) {
          params.set('maxPrice', String(price[1]));
        } else {
          params.append('maxPrice', String(price[1]));
        }
      } else {
        if (searchParams.get('maxPrice')) {
          params.delete('maxPrice');
        }
      }
      router.push(`${pathname}?${params}`);
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [price, setPrice]);

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex justify-between">
        <p className=" text-zinc-800 text-base font-bold">Price</p>
        <div className=" flex w-[125px] gap-2">
          <div className=" flex gap-1">
            <Input
              id="input-1"
              className=" h-7 w-full px-1 py-[2px] text-xs"
              value={minPrice.toFixed(0)}
              onChange={(e) => {
                setPrice([Number(e.target.value), maxPrice]);
              }}
            />
            <Label htmlFor="input-1" className=" text-xs">
              {' '}
              ${' '}
            </Label>
          </div>{' '}
          <div className=""> - </div>{' '}
          <div className=" flex gap-1">
            <Input
              id="input-2"
              className=" h-7 w-full px-1 py-[2px] text-xs"
              value={maxPrice.toFixed(0)}
              onChange={(e) => {
                setPrice([minPrice, Number(e.target.value)]);
              }}
            />
            <Label htmlFor="input-2" className="text-xs">
              {' '}
              {}${' '}
            </Label>
          </div>
        </div>
      </div>
      <Slider
        onValueChange={(range) => {
          const [newMin, newMax] = range;
          setPrice([newMin, newMax]);
        }}
        value={price}
        defaultValue={[0, 100]}
        min={0}
        max={1000}
        step={1}
      />
    </div>
  );
};
