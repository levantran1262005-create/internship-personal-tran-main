# BÁO CÁO TUẦN 2

## 1. Công việc đã thực hiện

- Cài đặt PostgreSQL và pgAdmin.
- Tìm hiểu Prisma ORM.
- Kết nối Prisma với PostgreSQL.
- Thiết kế cơ sở dữ liệu cho ứng dụng.
- Xây dựng 4 bảng:
  - Category.
  - Priority.
  - Task.
  - TaskHistory.
- Tạo migration bằng Prisma.
- Tạo dữ liệu mẫu bằng seed.
- Kết nối Next.js với PostgreSQL thông qua Prisma Client.
- Thay dữ liệu mock bằng dữ liệu thật từ database.
- Hiển thị danh sách công việc từ PostgreSQL.

## 2. Kết quả đạt được

- Database `task_management` hoạt động thành công.
- Migration được tạo và áp dụng thành công.
- Seed dữ liệu thành công.
- Next.js đọc được dữ liệu từ PostgreSQL.
- Hiển thị được công việc cùng Category và Priority.

## 3. Khó khăn

- Ban đầu sử dụng Prisma 7 nên gặp thay đổi về cấu hình datasource và driver adapter.
- Gặp lỗi Prisma Client chưa được generate.
- Gặp lỗi khi chạy seed.
- Cần phân biệt cấu hình Prisma 6 và Prisma 7.

## 4. Cách xử lý

- Chuyển project về Prisma 6 để phù hợp với cách triển khai của dự án.
- Cấu hình lại `DATABASE_URL`.
- Generate lại Prisma Client.
- Cấu hình seed trong `package.json`.
- Kiểm tra dữ liệu bằng pgAdmin.

## 5. Kế hoạch tuần tiếp theo

- Hoàn thiện CRUD.
- Thêm tìm kiếm và bộ lọc.
- Thêm validation.
- Hoàn thiện responsive.
- Kiểm thử.
- Deploy production.