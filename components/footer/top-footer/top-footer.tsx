import React, { FC } from 'react';
import styles from './top-footer.module.css';
import { CustomersType } from '@/types/customers_type';
import { RequisitesType } from '@/types/requisites_type';
import Link from 'next/link';

type TopFooterProps = {
  customers: CustomersType[] | undefined;
  requisites: RequisitesType[] | undefined;
};

export const TopFooter: FC<TopFooterProps> = ({ customers, requisites }) => {
  return (
    <div className={styles.top}>
      <div className="shared_container">
        <div className={styles.wrapper_top}>
          <div className={styles.wrapper_column}>
            <div className={styles.title}>HELP</div>
            {!customers ? (
              <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] max-sm:text-[10px]">
                No data received!
              </h1>
            ) : (
              customers?.map((el) => {
                return (
                  <Link href="#" className={styles.link} key={el.id}>
                    {el.name}
                  </Link>
                );
              })
            )}
          </div>
          <div className={styles.wrapper_column}>
            <div className={styles.title}>Shop</div>
            <Link href="#" className={styles.link}>
              New arrivals
            </Link>
            <Link href="#" className={styles.link}>
              Trending now
            </Link>
            <Link href="#" className={styles.link}>
              Sales
            </Link>
          </div>
          <div className={styles.wrapper_column}>
            <div className={styles.title}>Get in touch</div>
            {!requisites ? (
              <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] max-sm:text-[10px]">
                No data received!
              </h1>
            ) : (
              requisites?.map((el) => {
                return (
                  <React.Fragment key={el.id}>
                    <div className={styles.link}>Call:{el.phone}</div>
                    <div className={styles.link}>Email:{el.email}</div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
