import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import { ResponseStoreReviewForm } from './response-store-review-form';
import { StoreReviewType } from '@/types/stor_review_type';

export const ResponseStoreReviewModal = ({
  review,
}: {
  review: StoreReviewType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MessageCircle />
      </DialogTrigger>

      <DialogContent className="max-w-[350px] mx-2 rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-zinc-800 text-[28px] font-bold mb-4">
            Leave a review
          </DialogTitle>
        </DialogHeader>
        <ResponseStoreReviewForm setIsOpen={setIsOpen} review={review} />
      </DialogContent>
    </Dialog>
  );
};
