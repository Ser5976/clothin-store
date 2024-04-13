export type EstimationType = {
  rating: number;
  count: number;
  percentage: number;
};

export type CommonEstimationType = {
  ratingsArray: EstimationType[];
  positiveEstimation: number;
  totalRatings: number;
  positevePercentage: number;
};
