import prisma from "@/lib/prisma";
import { unlink } from "fs/promises";


export async function deleteVideo(id: string) {
    try {
        // First get the video data to access file paths
        const video = await prisma.video.findUnique({
            where: { id }
        });

        if (!video) {
            return { success: false, error: 'Video not found' };
        }

        // Delete the database record first
        await prisma.video.delete({
            where: { id }
        });

        // Delete physical files
        try {
            if (video.videoUrl) {
                await unlink(video.videoUrl);
            }
            if (video.thumbnailUrl) {
                await unlink(video.thumbnailUrl);
            }
        } catch (fileError) {
            console.warn('Failed to delete some files:', fileError);
            // Continue even if file deletion fails
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to delete video:', error);
        return { success: false, error: 'Failed to delete video' };
    }
}
