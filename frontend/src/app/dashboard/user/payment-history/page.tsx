'use client';

import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchPaymentHistory } from '@/lib/api';

export default function PaymentHistory() {
    const { data: payments, isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: fetchPaymentHistory,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Payment History</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.map((payment: any) => (
                        <TableRow key={payment.id}>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.paymentMethod}</TableCell>
                            <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}