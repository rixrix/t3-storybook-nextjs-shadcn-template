"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BellIcon,
  UserCircleIcon,
} from "lucide-react";
import { title } from "process";

// Mock data for the loyalty points
const loyaltyData = [
  { month: "Jan", points: 100 },
  { month: "Feb", points: 150 },
  { month: "Mar", points: 200 },
  { month: "Apr", points: 180 },
  { month: "May", points: 220 },
  { month: "Jun", points: 250 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded shadow-md">
        <p className="font-semibold">{`${label}`}</p>
        <p className="text-primary">{`Points: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [currentPoints, setCurrentPoints] = useState(250);
  const [pointsTrend, setPointsTrend] = useState(30);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircleIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/*  Points Graph */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle> Points History</CardTitle>
              <CardDescription>
                Your points accumulation over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  points: {
                    label: "Points",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={loyaltyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="points"
                      name="Points"
                      stroke="var(--color-points)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Current Points Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{currentPoints}</div>
              <p className="text-muted-foreground">Total points</p>
            </CardContent>
          </Card>

          {/* Trend Analysis Card */}
          <Card>
            <CardHeader>
              <CardTitle>Points Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-4xl font-bold">{pointsTrend}</div>
                {pointsTrend >= 0 ? (
                  <ArrowUpIcon className="h-6 w-6 text-green-500 ml-2" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-red-500 ml-2" />
                )}
              </div>
              <p className="text-muted-foreground">
                {pointsTrend >= 0 ? "Increase" : "Decrease"} from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; 2024 Program. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default {
  title: "Labs/Dashboard",
  component: Dashboard,
};

export const Default = () => <Dashboard />;
