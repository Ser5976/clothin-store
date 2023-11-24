import { RotateCw, UserCircle2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './account.module.css';

export const Account = () => {
  const session = useSession();
  return (
    <div className={styles.account}>
      {session.status === 'loading' && (
        <RotateCw
          size={20}
          color="#ffffff"
          strokeWidth={1.5}
          absoluteStrokeWidth
          className=" self-center  animate-spin opacity-[0.6]"
        />
      )}

      {session.status === 'unauthenticated' && (
        <>
          <div className={styles.login}>
            <Image
              src="/header/login.svg"
              alt="login"
              width={13.333}
              height={14.333}
            />
            <Link href="/signin">Log in</Link>
          </div>
          <span> /</span>
          <div className={styles.register}>
            <Link href="/signup">Register</Link>
          </div>
        </>
      )}

      {session.status === 'authenticated' && (
        <>
          {session.data?.user.image ? (
            <div className={styles.login}>
              <Image
                src={session.data.user.image}
                className="w-[20px] h-[20px] rounded-full"
                alt="картинка"
                width={20}
                height={20}
              />
              <Link href="#">Account</Link>
            </div>
          ) : (
            <div className={styles.login}>
              <UserCircle2 size={20} color="white" strokeWidth={1.5} />
              <Link href="#">Account</Link>
            </div>
          )}
          <span> /</span>
          <div className={styles.register}>
            <Link
              href="#"
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              Sine Out
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
