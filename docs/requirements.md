# YÊU CẦU HỆ THỐNG QUẢN LÝ CÔNG VIỆC CÁ NHÂN

## 1. Mục tiêu

Xây dựng ứng dụng web quản lý công việc cá nhân giúp người dùng tạo, theo dõi, cập nhật, tìm kiếm và quản lý các công việc cần thực hiện.

## 2. Đối tượng sử dụng

Người dùng cá nhân có nhu cầu quản lý công việc hằng ngày.

## 3. Chức năng chính

### 3.1. Xem danh sách công việc

Người dùng có thể xem danh sách các công việc đã được lưu trong hệ thống.

Mỗi công việc hiển thị:

- Tiêu đề
- Mô tả
- Danh mục
- Mức ưu tiên
- Trạng thái
- Hạn hoàn thành

### 3.2. Thêm công việc

Người dùng có thể tạo một công việc mới.

Thông tin gồm:

- Tiêu đề
- Mô tả
- Danh mục
- Mức ưu tiên
- Hạn hoàn thành

Công việc mới mặc định có trạng thái `TODO`.

### 3.3. Sửa công việc

Người dùng có thể cập nhật:

- Tiêu đề
- Mô tả
- Danh mục
- Mức ưu tiên
- Trạng thái
- Hạn hoàn thành

### 3.4. Xóa công việc

Người dùng có thể xóa công việc không còn cần thiết.

### 3.5. Tìm kiếm

Người dùng có thể tìm kiếm công việc theo tiêu đề.

### 3.6. Lọc

Người dùng có thể lọc công việc theo trạng thái:

- TODO - Chưa làm
- IN_PROGRESS - Đang làm
- COMPLETED - Hoàn thành

## 4. Validation

Hệ thống cần kiểm tra dữ liệu trước khi lưu:

- Tiêu đề không được để trống.
- Tiêu đề phải có ít nhất 3 ký tự.
- Hạn hoàn thành không được để trống.
- Không được chọn ngày đã qua.

## 5. Trạng thái giao diện

Ứng dụng cần hỗ trợ:

- Loading state
- Empty state
- Error state

Khi tìm kiếm không có dữ liệu phù hợp, hệ thống hiển thị thông báo:

`Không tìm thấy công việc nào.`

## 6. Responsive

Ứng dụng phải sử dụng được trên:

- Desktop
- Tablet
- Mobile

Giao diện không được tràn ngang trên màn hình nhỏ.

## 7. Công nghệ

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Git/GitHub
- Vercel
- Neon PostgreSQL

## 8. Cơ sở dữ liệu

Hệ thống sử dụng 4 bảng:

### Category

Lưu danh mục công việc.

### Priority

Lưu mức độ ưu tiên.

### Task

Lưu thông tin công việc.

### TaskHistory

Lưu lịch sử liên quan đến công việc.

Quan hệ:

- Category 1 - N Task
- Priority 1 - N Task
- Task 1 - N TaskHistory