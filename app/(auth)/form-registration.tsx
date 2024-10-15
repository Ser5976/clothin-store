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
import { registration } from './registration-service';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  RegisterDataType,
  RegisterValidator,
} from '@/validators/register-validator';

//здесь использую библиотеку компонентов shadcn/ui,классая штука

export const FormRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  //хуки Next для роутинга
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<RegisterDataType>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: RegisterDataType) {
    //console.log('data:', data);
    setIsLoading(true);
    try {
      // отправляем данные о пользователе в базу
      const register = await registration(data);
      //если  удачно зарегистрировались, логинемся
      if (register) {
        const login = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        // так обрабатываем ошибку для логина(т.к. для credentials это не ошибка )
        if (login?.error) {
          toast.error('Email or password is incorrect');
        }
        if (!login?.error) {
          //если  удачно залогинились,редиректим
          const url = callbackUrl.slice(callbackUrl.lastIndexOf('/') + 1);
          window.location.href = `/${url}`;
          // router.push(`/${url}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 w-full  "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 text-sm font-normal">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder=" Your name"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
            </FormItem>
          )}
        />
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
            Sung up
          </Button>
        </div>
      </form>
    </Form>
  );
};
