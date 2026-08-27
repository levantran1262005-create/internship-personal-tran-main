"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../../lib/session";

export type AuthState = {
  error?: string;
};

// ĐĂNG KÝ
export async function register(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      error: "Vui lòng nhập đầy đủ thông tin",
    };
  }

  if (password.length < 6) {
    return {
      error: "Mật khẩu phải có ít nhất 6 ký tự",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      error: "Email đã tồn tại",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  redirect("/auth/login?registered=1");
}

// ĐĂNG NHẬP
export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Vui lòng nhập email và mật khẩu",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: "Email hoặc mật khẩu không đúng",
    };
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return {
      error: "Email hoặc mật khẩu không đúng",
    };
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect("/");
}

// ĐĂNG XUẤT
export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}