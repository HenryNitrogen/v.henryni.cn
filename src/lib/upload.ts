import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import type { AdapterUser } from "next-auth/adapters";
import type { User } from "next-auth";

export async function upload(user: AdapterUser | User) {
  if (!user.email) {
    throw new Error("No email provided");
  }

  const email = user.email;
  const username = user.name || "Anonymous";

  let dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        username,
        email,
      },
    });
  }

  console.log("✅ 用户处理完成：", dbUser);
}
