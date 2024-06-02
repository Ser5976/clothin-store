import { getAllProducts } from '@/actions/get_all_products ';
import { getDelivery } from '@/actions/get_delivery';
import { getProduct } from '@/actions/get_product';
import { BreadcrumbComponent } from '@/components/product-page/breadcrumb';
import { ProductPage } from '@/components/product-page/general-info/product-page';
import { ProductMenu } from '@/components/product-page/product-menu/product-menu';
import { ProductTitle } from '@/components/product-page/product-title/product-title';

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);

  return {
    title: product.name,
  };
}

const Product = async ({ params }: { params: { productId: string } }) => {
  const productPromise = getProduct(params.productId);
  const deliveryPromise = getDelivery();
  const [product, delivery] = await Promise.all([
    productPromise,
    deliveryPromise,
  ]);
  return (
    <main>
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbComponent product={product} />
        </div>
      </div>
      <div className="shared_container  pt-[2%]">
        <ProductTitle title={product.name} />
        <ProductMenu productId={params.productId} />
        <div className=" w-full h-[0px] border border-gray-200"></div>
        <ProductPage product={product} delivery={delivery} />
      </div>
    </main>
  );
};

export default Product;

//generateStaticParams  используют в сочетании с динамическими сегментами маршрутов
//для статического создания маршрутов во время сборки, а не по требованию во время запроса.
export async function generateStaticParams() {
  const products = await getAllProducts();
  //здесь ограничили количества товаров(берём только 3) , остальные будут подгружаться сами
  // это чтобы при сборке небыло дахера страниц(будет долго загружаться)
  const topProducts = products.slice(0, 3);

  return topProducts.map((product) => ({
    productId: product.id,
  }));
}
