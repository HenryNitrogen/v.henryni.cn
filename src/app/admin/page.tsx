import {isAdmin} from "@/lib/admin";
import prisma from "@/lib/prisma";
import UploadPage from "./component/page";
export default async function AdminPage() {
    const ok =  await isAdmin();
    if (!ok) {
        return <div>Access Denied</div>;
    }

    const users = await prisma.user.findMany();

    return (
        <div className="m-20 mt-30">
            <h1>Admin Page</h1>
            <p>Welcome to the admin page!</p>
            
                <>
                <table>
                    <thead>
                        <tr>
                            <th>
                                username
                            </th>
                            <th>
                                email
                            </th>
                            <th>
                                createdAt
                            </th>
                        </tr>
                    </thead>
                    {users.map((user) => (
                    <tbody key={user.id}>
                        <td key={user.id}>
                            {user.username}
                        </td>
                        <td key={user.id}>
                            {user.email}
                        </td>
                        <td key={user.id}>
                        {user.createdAt.toLocaleDateString()} {user.createdAt.toTimeString()}
                        </td>
                    </tbody>
                     ))}
                </table>
                
                     <UploadPage />

                </>
           
        </div>
    );
}
