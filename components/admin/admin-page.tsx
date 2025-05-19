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

const AdminPage = ({ salesData }: { salesData: SalesDataType[] }) => {
  console.log('salesdata:', salesData);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sales by month</h2>
      <div className=" min-[900px]:hidden">
        <SalesChartMobil data={salesData} />
      </div>
      <div className="hidden min-[900px]:block  ">
        <SalesChartDesktop data={salesData} />
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
