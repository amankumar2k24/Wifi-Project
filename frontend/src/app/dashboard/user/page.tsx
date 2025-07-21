'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchUserDashboardData } from '@/lib/api';

export default function UserDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['user-dashboard'],
        queryFn: fetchUserDashboardData,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Active Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Plan</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.activePlan && (
                                <TableRow className="bg-green-100">
                                    <TableCell>{data.activePlan.months} Month(s)</TableCell>
                                    <TableCell>{new Date(data.activePlan.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(data.activePlan.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{data.activePlan.status}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}