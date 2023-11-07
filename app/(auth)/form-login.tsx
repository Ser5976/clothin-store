'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ILogin } from './types';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';

//здесь использую библиотеку компонентов shadcn/ui,классая штука
// а вот провайдер credentials из  next-auth/react не совсем, хотя может дело во мне
// пришлось самому костылить: обработка ошибки и роутинг на предыдущую страницу

const FormSchema = z.object({
  email: z.string().email('Invalid email').min(2, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must have more than 5 characters'),
});

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  //хуки Next для роутинга
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<ILogin>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: ILogin) {
    // console.log('data:', data);
    setIsLoading(true);
    try {
      //логинемся в next-auth
      const login = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log('logiiiiin:', login);
      // так обрабатываем ошибку для логина(т.к. для credentials это не ошибка )
      if (login?.error) {
        toast.error('Email or password is incorrect');
      }
      // роутинг на предыдущую страницу, пришлось с url строкой похимичить
      if (!login?.error) {
        setIsLoading(false);
        const url = callbackUrl.slice(callbackUrl.lastIndexOf('/') + 1);
        //window потомучто нужна перезагрузка,для getServerSession
        // window.location.href = `/${url}`;
        router.push(`/${url}`);
        //console.log('urllllll:', url);
      }
    } catch (error) {
      console.log;
    } finally {
      setIsLoading(false);
    }
  }
  // console.log('searchParams:', callbackUrl);
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 w-full  "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your working email"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <div>
          <Button
            disabled={isLoading}
            type="submit"
            className=" w-full bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
          >
            {isLoading ? (
              <RotateCw
                size={20}
                color="#ffffff"
                strokeWidth={1.5}
                absoluteStrokeWidth
                className="mr-4  animate-spin"
              />
            ) : null}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};
