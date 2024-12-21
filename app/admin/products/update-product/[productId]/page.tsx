import { getProduct } from '@/actions/get_product';
import { UpdateProductPage } from '@/components/admin/products/create-update/update-product-page';

const UpdateProduct = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  return <UpdateProductPage product={product} />;
};
export default UpdateProduct;
