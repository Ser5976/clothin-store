import Image from 'next/image';
import styles from './bottom-footer.module.css';
import { GoToTop } from './go-to-top';

export const BottomFooter = () => {
  return (
    <div className={styles.bottom}>
      <div className="shared_container">
        <div className={styles.wrapper_bottom}>
          <div className={styles.wrapper_bottom_left}>
            <div>© All rights reserved. Made with</div>
            <Image
              src="/heart/outline.svg"
              alt="heart"
              width={16}
              height={16}
            />
            <div>by Createx Studio </div>
          </div>
          <GoToTop />
        </div>
      </div>
    </div>
  );
};
