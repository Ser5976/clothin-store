import { TypeReviews } from '@/types/type_reviews';
import { dateFormatting } from '@/utils/date-formatting';
import { DeleteProductReview } from './delete-product-review';
import { EditProductReview } from './edit-product-review/edit-product-review';

const ProductReviews = ({
  productReviews,
}: {
  productReviews: TypeReviews[] | undefined;
}) => {
  return (
    <section className=" grid grid-cols-1 lg:grid-cols-4 lg:gap-4  ">
      <div className=" lg:col-span-1 ">
        <h1 className="  text-zinc-800  font-black  leading-[130%] mt-[3%] text-xl lg:text-2xl">
          Your product reviews
        </h1>
      </div>

      <div className=" lg:col-span-3">
        {!productReviews ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : productReviews.length === 0 ? (
          <h1 className=" text-center font-semibold mt-2">
            You didnt have any product reviews!
          </h1>
        ) : (
          <ul>
            {productReviews.map((review) => {
              return (
                <li className=" grid grid-cols-4 border-b py-4" key={review.id}>
                  <div className=" col-span-1">
                    {dateFormatting(review.createdAt)}
                  </div>
                  <div className=" col-span-2">{review.content}</div>
                  <div className=" col-span-1 flex justify-end gap-4">
                    <EditProductReview
                      content={review.content}
                      id={review.id}
                    />
                    <DeleteProductReview reviewId={review.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
