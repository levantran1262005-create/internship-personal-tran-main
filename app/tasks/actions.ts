"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { TaskStatus } from "@prisma/client";
import { getSession } from "../../lib/session";

// ========================
// THÊM CÔNG VIỆC
// ========================
export async function createTask(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string) || "";
  const categoryId = Number(formData.get("categoryId"));
  const priorityId = Number(formData.get("priorityId"));
  const dueDate = formData.get("dueDate") as string;

  // VALIDATION
  if (!title || title.length < 3) {
    throw new Error("Tiêu đề phải có ít nhất 3 ký tự");
  }

  if (!dueDate) {
    throw new Error("Vui lòng chọn hạn hoàn thành");
  }

  const selectedDate = new Date(dueDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw new Error("Không được chọn ngày đã qua");
  }

  await prisma.task.create({
    data: {
      title,
      description,
      status: "TODO",
      dueDate: new Date(dueDate),
      categoryId,
      priorityId,
      userId: session.userId,
    },
  });

  revalidatePath("/");

  redirect("/?success=create");
}

// ========================
// SỬA CÔNG VIỆC
// ========================
export async function updateTask(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string) || "";
  const categoryId = Number(formData.get("categoryId"));
  const priorityId = Number(formData.get("priorityId"));
  const status = formData.get("status") as TaskStatus;
  const dueDate = formData.get("dueDate") as string;

  if (!title || title.length < 3) {
    throw new Error("Tiêu đề phải có ít nhất 3 ký tự");
  }

  if (!dueDate) {
    throw new Error("Vui lòng chọn hạn hoàn thành");
  }

  const existingTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!existingTask) {
    throw new Error("Không tìm thấy công việc");
  }

  // USER chỉ được sửa task của mình
  if (
    session.role === "USER" &&
    existingTask.userId !== session.userId
  ) {
    throw new Error("Bạn không có quyền sửa công việc này");
  }

  await prisma.task.update({
    where: {
      id,
    },

    data: {
      title,
      description,
      categoryId,
      priorityId,
      status,
      dueDate: new Date(dueDate),
    },
  });

  revalidatePath("/");

  redirect("/?success=update");
}

// ========================
// XÓA CÔNG VIỆC
// ========================
export async function deleteTask(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const id = Number(formData.get("id"));

  const existingTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!existingTask) {
    throw new Error("Không tìm thấy công việc");
  }

  // USER chỉ được xóa task của mình
  if (
    session.role === "USER" &&
    existingTask.userId !== session.userId
  ) {
    throw new Error("Bạn không có quyền xóa công việc này");
  }

  await prisma.taskHistory.deleteMany({
    where: {
      taskId: id,
    },
  });

  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");

  redirect("/?success=delete");
}