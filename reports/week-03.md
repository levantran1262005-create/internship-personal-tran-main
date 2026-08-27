# BÁO CÁO TUẦN 3

## 1. Công việc đã thực hiện

- Hoàn thiện CRUD công việc:
  - Create.
  - Read.
  - Update.
  - Delete.
- Xây dựng chức năng tìm kiếm theo tiêu đề.
- Xây dựng bộ lọc theo trạng thái.
- Thêm validation dữ liệu.
- Không cho phép chọn hạn hoàn thành đã qua.
- Xây dựng Loading State.
- Xây dựng Empty State.
- Xây dựng Error State.
- Hoàn thiện responsive.
- Viết tối thiểu 10 test case.
- Hoàn thiện README.
- Chạy production build.
- Đưa source code lên GitHub.
- Tạo PostgreSQL production trên Neon.
- Deploy ứng dụng lên Vercel.

## 2. Kết quả đạt được

Ứng dụng Personal Task Management đã có các chức năng:

- Xem danh sách công việc.
- Thêm công việc.
- Sửa công việc.
- Xóa công việc.
- Tìm kiếm công việc.
- Lọc theo trạng thái.
- Validation dữ liệu.
- Responsive trên nhiều kích thước màn hình.
- Xử lý loading, empty và error state.

Production build chạy thành công bằng:

`npm run build`

Ứng dụng đã được triển khai lên môi trường production.

## 3. Khó khăn

- Gặp lỗi khi cấu hình Git trên Windows.
- Git chưa được nhận diện trong PowerShell nên phải sử dụng Git Bash.
- Gặp vấn đề khi push repository lần đầu.
- PostgreSQL localhost không thể sử dụng trực tiếp trên Vercel.

## 4. Cách xử lý

- Cài đặt và cấu hình Git.
- Sử dụng Git Bash để quản lý repository.
- Tạo repository GitHub và push source code.
- Sử dụng Neon PostgreSQL cho database production.
- Cấu hình `DATABASE_URL` trên Vercel.

## 5. Kết quả cuối tuần

- Source code được quản lý trên GitHub.
- Database production hoạt động trên Neon.
- Website production hoạt động trên Vercel.
- CRUD, search và filter hoạt động với database thật.
- Hoàn thành test case và tài liệu dự án.

## 6. Bài học rút ra

- Hiểu luồng xử lý từ giao diện đến server.
- Biết sử dụng Prisma để thao tác PostgreSQL.
- Hiểu migration và seed.
- Biết sử dụng Git/GitHub.
- Biết triển khai ứng dụng Next.js lên production.
- Biết cấu hình database production bằng biến môi trường.