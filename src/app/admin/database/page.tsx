import { isAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";
import { deleteVideo } from "@/lib/database";
import { revalidatePath } from "next/cache";

export default async function DatabasePage() {
    const video = await prisma.video.findMany();
    const ok = await isAdmin();
    if (!ok) {
        return <div>Access Denied</div>;
    }

    async function handleDelete(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await deleteVideo(id);
        revalidatePath('/admin/database');
    }

    return (
        <div className="m-20 mt-30">
            <h1>Database Management</h1>
            <p>Welcome to the database management page!</p>
            <p>Here you can manage your database.</p>
            <table>
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>videoUrl</th>
                            <th>thumbnailUrl</th>
                            <th>createdAt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {video.map((video) => (
                        <tr key={video.id}>
                            <td>{video.title}</td>
                            <td>{video.description}</td>
                            <td>{video.videoUrl}</td>
                            <td>{video.thumbnailUrl}</td>
                            <td>
                                {video.createdAt.toLocaleDateString()} {video.createdAt.toTimeString()}
                            </td>
                            <td>
                                <form action={handleDelete}>
                                    <input type="hidden" name="id" value={video.id} />
                                    <button 
                                        type="submit" 
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                     ))}
                    </tbody>
                </table>
        </div>
    );

}