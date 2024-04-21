import { X } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import { LeaveReviewForm } from './leave-review-form';
import styles from './leave-review.module.css';

type LeaveReviewModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  productId: string;
  refetchEstimation: any;
  refetchReviews: any;
};

const LeaveReviewModal: FC<LeaveReviewModalProps> = ({
  show, //открытие модального окна
  setShow, //для закрытия модального окна
  productId,
  refetchEstimation,
  refetchReviews,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') {
      setShow(false);
      // При закрытии модального окна возвращаем скролл
      document.body.classList.remove('modal_open');
    }
  };
  if (!show) return null;
  const closeModal = () => {
    setShow(false);
    // При закрытии модального окна возвращаем скролл
    document.body.classList.remove('modal_open');
  };
  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className={styles.title}>Leave a review</h1>
        <X className={styles.icon} onClick={closeModal} />
        <LeaveReviewForm
          productId={productId}
          refetchEstimation={refetchEstimation}
          refetchReviews={refetchReviews}
          setShow={setShow}
        />
      </div>
    </div>
  );
};
export default LeaveReviewModal;
