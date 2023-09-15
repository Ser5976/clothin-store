'use client';
import Image from 'next/image';
import styles from './auth.module.css';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';

export const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const registrationGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      toast.error('There was a problem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.section_bottom}>
      <div className={styles.google}>
        <div className={styles.google_title}>Or sign in width</div>

        <div className={styles.google_button} onClick={registrationGoogle}>
          {isLoading ? (
            <RotateCw
              size={20}
              color="#17696A"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className="  animate-spin"
            />
          ) : (
            <Image
              src="/signup/Google.png"
              alt="google"
              width={16}
              height={16}
            />
          )}
        </div>
      </div>
    </div>
  );
};
