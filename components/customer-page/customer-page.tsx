import { CustomersType } from '@/types/customers_type';
import { BreadcrumbComponent } from './breadcrumb';

type CustomerPropsType = {
  customer: CustomersType;
};

const CustomerPage: React.FC<CustomerPropsType> = ({ customer }) => {
  return (
    <main>
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbComponent name={customer.name} />
        </div>
      </div>
      <div className="shared_container  pt-[2%]">
        <h1
          className=" text-zinc-800 text-[36px] font-black  leading-[130%] my-[3%]
  lg:text-[46px]"
        >
          {customer.name}
        </h1>

        <div className=" w-full h-[0px] border border-gray-200"></div>
        <div className=" py-5">
          <div dangerouslySetInnerHTML={{ __html: customer.longtext }} />
        </div>
      </div>
    </main>
  );
};

export default CustomerPage;
