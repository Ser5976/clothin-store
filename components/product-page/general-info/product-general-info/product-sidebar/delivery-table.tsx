import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeliveryType } from '@/types/delivery_type';
import Image from 'next/image';
import styles from './product-sidebar.module.css';

export const DeliveryTable = ({ delivery }: { delivery: DeliveryType[] }) => {
  return (
    <div className="flex flex-col gap-[16px] mt-[5%]">
      <p className=" text-zinc-800 text-base font-bold leading-relaxed">
        Delivery{' '}
      </p>
      <div className="text-gray-700 text-sm font-normal  leading-[21px]">
        Free standard shipping on orders
        <span className="text-gray-700 text-sm font-bold  leading-[21px] mx-[1%]">
          over ${delivery.length > 0 ? delivery[0].orderPrice : '500'}
        </span>
        before tax, plus free returns.
      </div>
      <Table>
        <TableHeader className={styles.table_header}>
          <TableRow>
            <TableHead>TYPE</TableHead>
            <TableHead>HOW LONG</TableHead>
            <TableHead>HOW MUCH</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={styles.table_body}>
          <TableRow>
            <TableCell>Standard delivery</TableCell>
            <TableCell>1-4 business days</TableCell>
            <TableCell>
              ${delivery.length > 0 ? delivery[0].standartPrice : '5'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Express delivery</TableCell>
            <TableCell>1 business day</TableCell>
            <TableCell>
              ${delivery.length > 0 ? delivery[0].expressPrice : '10'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pick up in store</TableCell>
            <TableCell>1-3 business days</TableCell>
            <TableCell>Free</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="h-[0px] border border-gray-200"></div>
      <div className="flex flex-col gap-[16px] mb-[2%]">
        <div className=" text-zinc-800 text-base font-bold leading-relaxed">
          Return
        </div>
        <div className="text-gray-700 text-sm font-normal  leading-[21px]">
          You have{' '}
          <span className="text-gray-700 text-sm font-bold  leading-[21px]">
            60 days
          </span>{' '}
          to return the item(s) using any of the following methods:
        </div>
        <div className="flex gap-[3%]">
          <div className="w-1 h-1 bg-cyan-800 rounded-full self-center"></div>
          <div className=" text-gray-700 text-sm font-normal  leading-[21px]">
            Free store return
          </div>
        </div>
        <div className="flex gap-[3%]">
          <div className="w-1 h-1 bg-cyan-800 rounded-full self-center"></div>
          <div className=" text-gray-700 text-sm font-normal  leading-[21px]">
            Free returns via USPS Dropoff Service
          </div>
        </div>
      </div>
      <div className="h-[0px] border border-gray-200"></div>
      <div className="flex gap-[3%] my-[2%]">
        <div className=" max-w-[120px]">
          <Image
            src="./visa.svg"
            width={120}
            height={60}
            alt="Picture"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className=" max-w-[120px]">
          <Image
            src="./master-card.svg"
            width={120}
            height={60}
            alt="Picture"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className=" max-w-[120px]">
          <Image
            src="./pay-pal.svg"
            width={120}
            height={60}
            alt="Picture"
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};
