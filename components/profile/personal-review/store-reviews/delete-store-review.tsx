'use client';
import { deleteProductReviewAction } from '@/server-action/user/delete-product-review-action';
import { deleteStoreProductReviewAction } from '@/server-action/user/delete-store-review-action';
import { RotateCw, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const DeleteStoreReview = ({ reviewId }: { reviewId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteReview = () => {
    setIsLoading(true);
    deleteStoreProductReviewAction(reviewId)
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          toast.success(res.success);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };
  return (
    <div onClick={deleteReview}>
      {isLoading ? (
        <RotateCw
          color="#4b5563"
          className="  w-4 h-4 sm:w-6 sm:h-6  animate-spin"
        />
      ) : (
        <Trash
          color="#4b5563"
          className=" w-4 h-4 sm:w-6 sm:h-6  cursor-pointer"
        />
      )}
    </div>
  );
};
