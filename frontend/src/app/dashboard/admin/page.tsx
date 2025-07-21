// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { fetchAdminDashboardData } from '@/lib/api';

// export default function AdminDashboard() {
//     const { data, isLoading } = useQuery({
//         queryKey: ['admin-dashboard'],
//         queryFn: fetchAdminDashboardData,
//     });

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div className="space-y-6">
//             <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Recent Payments (Top 5)</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>User</TableHead>
//                                     <TableHead>Amount</TableHead>
//                                     <TableHead>Date</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {data?.recentPayments?.slice(0, 5).map((payment: any) => (
//                                     <TableRow key={payment.id}>
//                                         <TableCell>{payment.userName}</TableCell>
//                                         <TableCell>{payment.amount}</TableCell>
//                                         <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Upcoming Payments (Next 5 Days)</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>User</TableHead>
//                                     <TableHead>Due Date</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {data?.upcomingPayments.map((payment: any) => (
//                                     <TableRow key={payment.id}>
//                                         <TableCell>{payment.userName}</TableCell>
//                                         <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>New Users</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Name</TableHead>
//                                     <TableHead>Join Date</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {data?.newUsers.map((user: any) => (
//                                     <TableRow key={user.id}>
//                                         <TableCell>{user.name}</TableCell>
//                                         <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Deleted Users</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Name</TableHead>
//                                     <TableHead>Deleted Date</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {data?.deletedUsers.map((user: any) => (
//                                     <TableRow key={user.id}>
//                                         <TableCell>{user.name}</TableCell>
//                                         <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }

'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// ✅ Dummy API function
async function fetchDummyAdminDashboardData() {
  return {
    recentPayments: [
      { id: 1, userName: 'Aman Kumar', amount: '₹500', createdAt: '2025-07-15T10:00:00Z' },
      { id: 2, userName: 'Riya Sen', amount: '₹700', createdAt: '2025-07-16T11:30:00Z' },
      { id: 3, userName: 'Mohit Sharma', amount: '₹350', createdAt: '2025-07-17T14:20:00Z' },
      { id: 4, userName: 'Kajal Verma', amount: '₹1200', createdAt: '2025-07-18T09:45:00Z' },
      { id: 5, userName: 'Ankit Yadav', amount: '₹800', createdAt: '2025-07-19T12:10:00Z' },
    ],
    upcomingPayments: [
      { id: 6, userName: 'Raj Singh', dueDate: '2025-07-21T00:00:00Z' },
      { id: 7, userName: 'Nikita Rana', dueDate: '2025-07-22T00:00:00Z' },
    ],
    newUsers: [
      { id: 8, name: 'Sonal Mehta', createdAt: '2025-07-19T10:00:00Z' },
      { id: 9, name: 'Vivek Chauhan', createdAt: '2025-07-18T08:30:00Z' },
    ],
    deletedUsers: [
      { id: 10, name: 'Deepak Kumar', updatedAt: '2025-07-17T15:45:00Z' },
      { id: 11, name: 'Megha Kapoor', updatedAt: '2025-07-16T13:15:00Z' },
    ],
  };
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: fetchDummyAdminDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments (Top 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.recentPayments?.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.userName}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments (Next 5 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.upcomingPayments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.userName}</TableCell>
                    <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.newUsers.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deleted Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Deleted Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.deletedUsers.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
