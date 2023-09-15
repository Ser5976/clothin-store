import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/config/auth_options';
import Link from 'next/link';
import { FormLogin } from '../form-login';
import { GoogleButton } from '../google-button';
import styles from '../auth.module.css';

const Signin = async () => {
  //проверка аторизации при помощи next-auth(на стороне сервера,так быстрей) и редирект на главную, если аторизованы
  const session = await getServerSession(authOptions);
  session && redirect('/');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section_top}>
          <div className={styles.title}>Sign in</div>
          <div className={styles.subtitle_top}>
            Sign in to your account using email and password provided during
            registration.
          </div>
          <FormLogin />
          <div className={styles.subtitle_bottom}>
            <span>Don't have an account? </span>
            <Link href="/signup" className={styles.link}>
              Sign up
            </Link>
          </div>
        </div>
        <div className={styles.separator}></div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Signin;
