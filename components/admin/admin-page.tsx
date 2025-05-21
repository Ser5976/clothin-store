'use client';
import { SalesDataType } from '@/types/sales_type';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import React from 'react';
import { useSalesQuery } from '@/react-queries/admin/useSalesQuery';
import { Loader } from 'lucide-react';

const AdminPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех биллбордов
  const { data: salesData, isLoading, isError } = useSalesQuery();
  console.log('salesdata:', salesData);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sales by month</h2>
      <div className=" min-[900px]:hidden">
        {isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : isLoading ? (
          <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
            <Loader size={32} color="#17696a" />
          </div>
        ) : (
          <SalesChartMobil data={salesData} />
        )}
      </div>
      <div className="hidden min-[900px]:block  ">
        {isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : isLoading ? (
          <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
            <Loader size={32} color="#17696a" />
          </div>
        ) : (
          <SalesChartDesktop data={salesData} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;

const SalesChartMobil = ({ data }: { data: SalesDataType[] }) => {
  return (
    <ResponsiveContainer width="100%" height={650}>
      <BarChart
        layout="vertical" // <-- Делаем диаграмму вертикальной
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fontWeight: 'semibold', fill: '#4A5568' }}
        />{' '}
        {/* Ось X теперь показывает сумму */}
        <YAxis
          dataKey="month"
          tick={{ fontSize: 12, fontWeight: 'semibold', fill: '#4A5568' }}
          type="category"
        />{' '}
        {/* Ось Y показывает месяцы */}
        <Tooltip />
        <Bar
          dataKey="totalSales"
          fill="#17696A"
          barSize={30}
          name="Общая сумма продаж"
        />
        <Bar
          dataKey="totalOrders"
          fill="#F59E0B"
          barSize={30}
          name="Количество заказов"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const SalesChartDesktop = ({ data }: { data: SalesDataType[] }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        layout="horizontal" // <-- Делаем диаграмму горизонтальной
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="month"
          tick={{ fontSize: 12, fontWeight: 'semibold', fill: '#4A5568' }}
        />
        <YAxis
          type="number"
          tick={{ fontSize: 12, fontWeight: 'semibold', fill: '#4A5568' }}
        />
        <Tooltip />
        <Bar dataKey="totalSales" fill="#17696A" name="Общая сумма продаж" />
        <Bar dataKey="totalOrders" fill="#F59E0B" name="Количество заказов" />
      </BarChart>
    </ResponsiveContainer>
  );
};
