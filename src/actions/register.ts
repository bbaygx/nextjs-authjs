"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid Emails" };
  }

  const { email, name, password } = validateField.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const exitingUser = await getUserByEmail(email);

  if (exitingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  //   TODO: send verification email token

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email send!" };
};
