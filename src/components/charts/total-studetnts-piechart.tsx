'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getStudentsCountByCategrory } from '@/app/server-actions/charts/charts';
import { useToast } from '@/hooks/use-toast';
import { CATEGORYNAME } from '@prisma/client';
import { Skeleton } from '../ui/skeleton';

const chartColor = [
  'var(--color-chrome)',
  'var(--color-safari)',
  'var(--color-firefox)',
];

const chartConfig = {
  visitors: {
    label: 'Students',
  },
  chrome: {
    label: 'Nursery (NUR - KG-II)',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Primary (I - VIII)',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Secondary (IX - X)',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

interface ChartData {
  categoryName: CATEGORYNAME;
  totalStudents: number;
  fill: string;
}

export function TotalStudentsPieChart() {
  const { toast } = useToast();
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [totalStudents, setTotalStudents] = React.useState(0);
  React.useEffect(() => {
    getStudentsCountByCategrory().then((data) => {
      if (data.data) {
        var totalCount = 0;
        const result: ChartData[] = data.data.map((category, index) => {
          totalCount += category.totalStudents;
          return {
            categoryName: category.categoryName,
            totalStudents: category.totalStudents,
            fill: chartColor[index % chartColor.length],
          };
        });
        setLoading(false);
        setTotalStudents(totalCount);
        if (totalCount === 0) {
          setError('No Students found!');
        } else {
          setChartData(result);
        }
      } else {
        setError(data.error);
        setLoading(false);
        toast({ description: data.error, variant: 'destructive' });
      }
    });
  }, []);

  return <Card className="flex flex-col">
      
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-purple-200">Total Students</CardTitle>
        <CardDescription>Session 2024-25</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          {loading ? <Skeleton className='w-full h-full'></Skeleton> : error ? (
            <div className="text-center mt-10 text-xl text-red-500">
              {error}
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="totalStudents"
                nameKey="categoryName"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStudents.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Students
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
}
