import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/config/auth_options';
import Link from 'next/link';
import { FormRegistration } from './components/form-registration';
import { GoogleButton } from '../signin/components/google-button';
import styles from './components/signup.module.css';

const Signup = async () => {
  //проверка аторизации при помощи next-auth(на стороне сервера,так быстрей) и редирект на главную, если аторизованы
  // const session = await getServerSession(authOptions);
  // session && redirect('/');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section_top}>
          <div className={styles.title}>Sign up</div>
          <div className={styles.subtitle_top}>
            Registration takes less than a minute but gives you full control
            over your orders.
          </div>
          <FormRegistration />
          <div className={styles.subtitle_bottom}>
            <span>Already have an account? </span>
            <Link href="/signin" className={styles.link}>
              Sign in
            </Link>
          </div>
        </div>
        <div className={styles.separator}></div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Signup;
