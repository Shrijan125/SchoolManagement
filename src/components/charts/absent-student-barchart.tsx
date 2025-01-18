'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
} from '@/components/ui/chart';
import { getAbsentStudents } from '@/app/server-actions/charts/charts';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
  desktop: {
    label: 'Absent',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface ChartData {
  gradeName: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
};

export function AbsentStudentBarChart() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    getAbsentStudents().then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
        toast({ description: data.error, variant: 'destructive' });
        return;
      }
      if (data.data) {
        const filteredData = data.data.filter((item) => item.totalStudents > 0);
        setChartData(filteredData);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-purple-200">Today's Attendance</CardTitle>
        <CardDescription>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date())}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {loading ? <Skeleton className='w-full h-full'></Skeleton> : error ? (
            <div className="text-center mt-10 text-xl text-red-500">{error}</div>
          ) : (
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="gradeName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { gradeName, totalStudents, presentStudents, absentStudents } = payload[0].payload;
                    return (
                      <div className="p-2 rounded shadow-lg bg-black">
                        <div><strong>Grade:</strong> {gradeName}</div>
                        <div><strong>Total Students:</strong> {totalStudents}</div>
                        <div><strong>Present Students:</strong> {presentStudents}</div>
                        <div><strong>Absent Students:</strong> {absentStudents}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="presentStudents" fill="var(--color-desktop)" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
