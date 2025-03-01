import { UpdateCustomerPage } from '@/components/admin/customers/create-update/update-customer-page';

const UpdateCustomers = ({ params }: { params: { id: string } }) => {
  return <UpdateCustomerPage customerId={params.id} />;
};
export default UpdateCustomers;
