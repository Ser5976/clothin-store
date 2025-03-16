import { getProduct } from '@/actions/get_product';
import { UpdateProductPage } from '@/components/admin/products/create-update/update-product-page';

const UpdateProduct = async ({ params }: { params: { productId: string } }) => {
  return <UpdateProductPage productId={params.productId} />;
};
export default UpdateProduct;
