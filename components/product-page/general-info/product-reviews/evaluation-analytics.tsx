import { CommonEstimationType } from '@/types/estimation_type';
import { FC, memo } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './product-reviews.module.css';
import { SkeletonEvaluationAnalytics } from './skeleton-evaluation-analytics';

type EvaluationAnalyticsProps = {
  isLoadingEstimation: boolean;
  isErrorEstimation: boolean;
  estimations: CommonEstimationType | undefined;
};

const EvaluationAnalytics: FC<EvaluationAnalyticsProps> = ({
  isLoadingEstimation,
  isErrorEstimation,
  estimations,
}) => {
  const lll = true;
  return (
    <>
      {isErrorEstimation ? (
        <div className=" text-red-500 text-sm  flex flex-col items-center">
          <div>Evaluation analytics data not received</div>
        </div>
      ) : isLoadingEstimation ? (
        <SkeletonEvaluationAnalytics />
      ) : (
        <div className=" flex flex-col grow  max-w-[420px] gap-[5%] ">
          {estimations?.ratingsArray.map((estimation) => {
            return (
              <div
                key={estimation.rating}
                className=" flex gap-[15px] items-center"
              >
                <div className=" flex gap-[5px] items-baseline">
                  <div>{estimation.rating}</div>
                  <Star size={16} strokeWidth={1} />
                </div>
                <div className=" h-1 w-full bg-slate-200 rounded-sm">
                  <div
                    className={cn(` h-full rounded-sm`, {
                      [styles.progress_tel]: 5 === estimation.rating,
                      [styles.progress_green]: 4 === estimation.rating,
                      [styles.progress_yellow]: 3 === estimation.rating,
                      [styles.progress_orange]: 2 === estimation.rating,
                      [styles.progress_red]: 1 === estimation.rating,
                    })}
                    style={{ width: `${estimation.percentage}%` }}
                  ></div>
                </div>
                <div>{estimation.count}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default memo(EvaluationAnalytics);
