import db from "@/lib/db";
import { Prisma, User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    // Tangani error Prisma di sini
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error spesifik yang diketahui
      if (error.code === "P2002") {
        // Contoh: Email tidak ditemukan
        throw new Error("User not found");
      }
      // Handle error lainnya
      throw new Error("Prisma error: " + error.message);
    } else {
      // Error Prisma yang tidak diketahui
      throw new Error("Unknown Prisma error: " + error);
    }
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    // Tangani error Prisma di sini
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error spesifik yang diketahui
      if (error.code === "P2002") {
        // Contoh: Email tidak ditemukan
        throw new Error("User not found");
      }
      // Handle error lainnya
      throw new Error("Prisma error: " + error.message);
    } else {
      // Error Prisma yang tidak diketahui
      throw new Error("Unknown Prisma error: " + error);
    }
  }
};
