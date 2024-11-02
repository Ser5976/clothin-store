import { StoreReviewType } from '@/types/stor_review_type';
import { dateFormatting } from '@/utils/date-formatting';
import { DeleteStoreReview } from './delete-store-review';
import { EditStoreReview } from './edit-store-review/edit-store-review';

const StoreReviews = ({
  storeReviews,
}: {
  storeReviews: StoreReviewType[] | undefined;
}) => {
  return (
    <section className=" grid grid-cols-1 lg:grid-cols-4 lg:gap-4   ">
      <div className=" lg:col-span-1 ">
        <h1 className="  text-zinc-800  font-black  leading-[130%] mt-[3%] text-xl lg:text-2xl">
          Your store reviews
        </h1>
      </div>

      <div className=" lg:col-span-3">
        {!storeReviews ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : storeReviews.length === 0 ? (
          <h1 className=" text-center font-semibold mt-2">
            You didnt have any store reviews!
          </h1>
        ) : (
          <ul>
            {storeReviews.map((review) => {
              return (
                <li className=" grid grid-cols-4 border-b py-4" key={review.id}>
                  <div className=" col-span-1">
                    {dateFormatting(String(review.createdAt))}
                  </div>
                  <div className=" col-span-2">{review.content}</div>
                  <div className=" col-span-1 flex justify-end gap-4">
                    <EditStoreReview content={review.content} id={review.id} />
                    <DeleteStoreReview reviewId={review.id} />
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

export default StoreReviews;
