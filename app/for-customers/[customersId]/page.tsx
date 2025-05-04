import { getCustomer } from '@/actions/get_customer';
import CustomerPage from '@/components/customer-page/customer-page';

const Customers = async ({ params }: { params: { customersId: string } }) => {
  const customer = await getCustomer(params.customersId);
  return <CustomerPage customer={customer} />;
};

export default Customers;
