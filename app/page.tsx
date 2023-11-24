import { getCategories } from '@/actions/get_categories';
import { getCustomers } from '@/actions/get_customers';
import { getPhone } from '@/actions/get_phone';
import StoreHeaderInitializer from '@/components/store-initializer/store-header-initializer';
import { useHeaderStore } from '@/stores/useHeaderStore';

export default async function Home() {
  const categories = await getCategories();
  const customers = await getCustomers();
  const phone = await getPhone();

  // изменяем данные в store(zustand) через серверный компонент
  //данные будут видны на сервере, а на клиенте нет
  //чтобы были видны на клиенте, используем клиентский компонент StoreHeaderInitializer

  return (
    <>
      <StoreHeaderInitializer
        categories={categories}
        customers={customers}
        phone={phone}
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Hello!!!
      </main>
    </>
  );
}
