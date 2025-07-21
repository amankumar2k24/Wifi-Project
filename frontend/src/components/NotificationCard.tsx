import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function NotificationCard({ notification }: { notification: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{notification.type}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{notification.message}</p>
                <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    );
}