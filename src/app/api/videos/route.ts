import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


export async function GET() {
  try {
    const videos = await prisma.video.findMany()
    return NextResponse.json(videos)
  } catch (error: unknown) {
    console.error('Failed to fetch videos:', error)
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}