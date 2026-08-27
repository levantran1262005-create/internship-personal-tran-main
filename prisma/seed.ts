import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Category
  const study = await prisma.category.create({
    data: {
      name: "Học tập",
    },
  });

  const project = await prisma.category.create({
    data: {
      name: "Dự án",
    },
  });

  // Priority
  const low = await prisma.priority.create({
    data: {
      name: "Thấp",
    },
  });

  const medium = await prisma.priority.create({
    data: {
      name: "Trung bình",
    },
  });

  const high = await prisma.priority.create({
    data: {
      name: "Cao",
    },
  });

  // Task
  await prisma.task.create({
    data: {
      title: "Học Next.js",
      description: "Tìm hiểu App Router",
      status: "IN_PROGRESS",
      dueDate: new Date("2026-08-10"),
      categoryId: study.id,
      priorityId: high.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Thiết kế giao diện",
      description: "Hoàn thành UI",
      status: "TODO",
      dueDate: new Date("2026-08-12"),
      categoryId: project.id,
      priorityId: medium.id,
    },
  });

  console.log("Seed thành công");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });