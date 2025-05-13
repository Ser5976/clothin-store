export type DeliveryType = {
  id: string;
  longtext: string;
  standartPrice: string;
  expressPrice: string;
  orderPrice: string;
  createdAt: string;
  updatedAt: string;
};

export type EditedDeliveryType = {
  standartPrice: string;
  expressPrice: string;
  orderPrice: string;
};
