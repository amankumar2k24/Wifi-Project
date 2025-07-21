'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationCard } from '@/components/NotificationCard';
import { fetchNotifications } from '@/lib/api';

export default function UserNotifications() {
    const { data: notifications, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <div className="grid grid-cols-1 gap-4">
                {notifications?.map((notification: any) => (
                    <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
}