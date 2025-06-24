import { getServerSession } from "next-auth";

export async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.email === process.env.ADMIN_EMAIL;
}