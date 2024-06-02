import { cn } from '@/lib/utils';
import { useDislikeReviewPost } from '@/react-queries/useDislikeReviewPost';
import { useDislikeReviewQurety } from '@/react-queries/useDislikeReviewQuery';
import { useLikeReviewPost } from '@/react-queries/useLikeReviewPost';
import { useLikeReviewQurety } from '@/react-queries/useLikeReviewQuery';
import { TypeVoteReviews } from '@/types/type_vote_reviews';
import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { memo } from 'react';
import styles from './product-reviews.module.css';

const VoteReview = ({ reviewId }: { reviewId: string }) => {
  //проверка авторизации
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';

  //кастомный хук useQuery, получаем данные по лайкам выбранного отзыва
  const {
    data: likes,
    refetch: refetchLike,
    isLoading: isLoadingLike,
  } = useLikeReviewQurety(reviewId);
  //кастомный хук useQuery, получаем данные по дислайкам выбранного отзыва
  const {
    data: dislikes,
    refetch: refetchDislike,
    isLoading: isLoadingDislike,
  } = useDislikeReviewQurety(reviewId);

  return (
    <div className={styles.review_vote}>
      <LikeReview
        isAuth={isAuth}
        isLoadingLike={isLoadingLike}
        reviewId={reviewId}
        likes={likes}
        refetchLike={refetchLike}
        refetchDislike={refetchDislike}
        userId={data?.user.id}
      />
      <DislikeReview
        isAuth={isAuth}
        isLoadingDislike={isLoadingDislike}
        reviewId={reviewId}
        dislikes={dislikes}
        refetchDislike={refetchDislike}
        refetchLike={refetchLike}
        userId={data?.user.id}
      />
    </div>
  );
};

export default memo(VoteReview);

const LikeReview = ({
  isAuth,
  isLoadingLike,
  reviewId,
  refetchLike,
  refetchDislike,
  userId,
  likes,
}: {
  isAuth: boolean;
  isLoadingLike: boolean;
  reviewId: string;
  refetchLike: any;
  refetchDislike: any;
  userId: string | undefined;
  likes: TypeVoteReviews[] | undefined;
}) => {
  const path = usePathname();
  const router = useRouter();

  //кастомный хук useMutation, изменяем данные лайкам в базе
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationLikeReview = useLikeReviewPost(refetchLike, refetchDislike);
  //нсли не аторизованы, редиректим на логин(callbackUrl,для того чтобы нас, при авторизации, назад редеректнули,
  //специально прописал в логине и регистрации)
  const likeReviewHandler = () => {
    if (userId) {
      mutationLikeReview.mutate({ reviewId });
    } else {
      router.push(`/signin?callbackUrl=${path}`);
    }
  };
  return (
    <div
      className=" relative grid grid-cols-2 gap-1 items-baseline cursor-pointer"
      onClick={likeReviewHandler}
    >
      <ThumbsUp
        color="#03CEA4"
        className={cn(styles.review_like, {
          [styles.review_like_active]: likes?.some(
            (obj) => obj.userId === userId
          ),
        })}
      />
      <div>
        {mutationLikeReview.isError ? (
          <span className="  text-red-500 ">?</span>
        ) : (isAuth && isLoadingLike) || mutationLikeReview.isLoading ? (
          <RotateCw
            size={16}
            color="#808080"
            strokeWidth={1}
            absoluteStrokeWidth
            className=" absolute top-[3px] right-[2px]  animate-spin"
          />
        ) : (
          <div className="">{likes?.length}</div>
        )}
      </div>
    </div>
  );
};

const DislikeReview = ({
  isAuth,
  isLoadingDislike,
  reviewId,
  refetchDislike,
  refetchLike,
  userId,
  dislikes,
}: {
  isAuth: boolean;
  isLoadingDislike: boolean;
  reviewId: string;
  refetchDislike: any;
  refetchLike: any;
  userId: string | undefined;
  dislikes: TypeVoteReviews[] | undefined;
}) => {
  const path = usePathname();
  const router = useRouter();

  //кастомный хук useMutation, изменяем данные лайкам в базе
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationDislikeReview = useDislikeReviewPost(
    refetchDislike,
    refetchLike
  );
  const dislikeReviewHandler = () => {
    if (userId) {
      mutationDislikeReview.mutate({ reviewId });
    } else {
      router.push(`/signin?callbackUrl=${path}`);
    }
  };
  return (
    <div
      className=" relative grid grid-cols-2 gap-1 items-baseline cursor-pointer"
      onClick={dislikeReviewHandler}
    >
      <ThumbsDown
        color="#FF4242"
        className={cn(styles.review_dislike, {
          [styles.review_dislike_active]: dislikes?.some(
            (obj) => obj.userId === userId
          ),
        })}
      />
      <div>
        {mutationDislikeReview.isError ? (
          <span className="  text-red-500 ">?</span>
        ) : (isAuth && isLoadingDislike) || mutationDislikeReview.isLoading ? (
          <RotateCw
            size={16}
            color="#808080"
            strokeWidth={1}
            absoluteStrokeWidth
            className=" absolute top-[3px] right-[2px]  animate-spin"
          />
        ) : (
          <div className="">{dislikes?.length}</div>
        )}
      </div>
    </div>
  );
};
