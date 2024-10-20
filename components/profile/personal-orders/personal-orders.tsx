import { ItemReview } from '@/components/order/item-review';
import { OrderType } from '@/types/order_type';
import { dateFormatting } from '@/utils/date-formatting';

const PersonalOrders = ({ orders }: { orders: OrderType[] | undefined }) => {
  //удаляем неоплаченные заказы
  const paid = orders ? orders.filter((orders) => orders.isPaid) : undefined;
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-4  border-t-2 py-[3%] gap-8">
      <div className=" lg:col-span-1 ">
        <h1 className="  text-zinc-800  font-black  leading-[130%] mt-[3%] text-xl lg:text-2xl">
          Your order
        </h1>
      </div>

      <ul className=" lg:col-span-3">
        {!orders ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : orders.length === 0 ? (
          <h1 className=" text-center font-semibold mt-2">
            You didnt have any purchases!
          </h1>
        ) : (
          <ul>
            {paid?.map((order) => {
              return (
                <div key={order.id} className=" flex flex-col">
                  <div className="">
                    {dateFormatting(String(order.createdAt))}
                  </div>
                  {order.orderItems.map((item) => {
                    return <ItemReview item={item} key={item.id} />;
                  })}
                </div>
              );
            })}
          </ul>
        )}
      </ul>
    </main>
  );
};

export default PersonalOrders;
