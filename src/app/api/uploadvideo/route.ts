import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { isAdmin } from "@/lib/admin";
export async function POST(request: Request) {
    const admin = await isAdmin();
    if (admin){const session = await getServerSession();
        const name = session?.user?.name || "Anonymous";
        const data = await request.formData();
        const file = data.get('file')as unknown as File;
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const thumbnail = data.get('thumbnail') as File;
        const thumbnailBytes = await thumbnail.arrayBuffer();
        const a = Buffer.from(thumbnailBytes);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const rand = randomUUID();
        const thumbnailFilename = `${rand}-1${thumbnail.name}`;
        const thumbnailFilepath = path.join(process.cwd(), "public/uploads/thumbnails", thumbnailFilename);
        await writeFile(thumbnailFilepath, a);
        const thumbnailUrl = `/uploads/thumbnails/${thumbnailFilename}`;
        const filename = `${rand}-${file.name}`;
        const filepath = path.join(process.cwd(), "public/uploads/videos", filename);
        await writeFile(filepath, buffer);
        const fileUrl = `/uploads/videos/${filename}`;
        try{
            await prisma.video.create({
                data: {
                    id: rand,
                    title: title+name,
                    description: description,
                    videoUrl : fileUrl,
                    thumbnailUrl: thumbnailUrl,
                },
            });
        }catch (error) {
            console.error("Error saving video to database:", error);
            return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
        }
        return NextResponse.json({ url: fileUrl });}
        else{
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
        }
    
}