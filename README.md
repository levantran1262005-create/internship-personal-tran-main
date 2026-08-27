Personal Task Management
Ứng dụng quản lý công việc cá nhân được xây dựng trong chương trình thực tập Web Full-stack.

Hệ thống cho phép người dùng đăng ký, đăng nhập và quản lý các công việc cá nhân. Mỗi người dùng chỉ có thể xem và quản lý công việc của mình. Quản trị viên có quyền xem toàn bộ công việc và danh sách tài khoản trong hệ thống.

1. Công nghệ sử dụng
Frontend
Next.js App Router
React
TypeScript
Tailwind CSS
Backend
Next.js Server Actions
Prisma ORM
Database
PostgreSQL
Neon PostgreSQL
Authentication
bcryptjs
jose
JWT Session
HTTP Cookie
Deploy
Vercel
2. Chức năng chính
Authentication
Đăng ký tài khoản
Đăng nhập
Đăng xuất
Mã hóa mật khẩu bằng bcrypt
Session bằng JWT
Validation đăng nhập / đăng ký
Phân quyền
Hệ thống có 2 vai trò:

USER
Xem công việc của mình
Thêm công việc
Sửa công việc của mình
Xóa công việc của mình
Không thể sửa/xóa công việc của người khác
ADMIN
Xem toàn bộ công việc
Quản lý công việc
Xem danh sách người dùng
Xem thống kê tài khoản
3. Quản lý công việc
Người dùng có thể:

Xem danh sách công việc
Thêm công việc
Sửa công việc
Xóa công việc
Xác nhận trước khi xóa
Tìm kiếm theo tiêu đề
Lọc theo trạng thái
Chọn danh mục
Chọn mức ưu tiên
Chọn hạn hoàn thành
Cập nhật trạng thái công việc
Các trạng thái:

TODO - Chưa làm
IN_PROGRESS - Đang làm
COMPLETED - Hoàn thành
4. Validation
Hệ thống có các kiểm tra dữ liệu:

Không để trống tiêu đề
Tiêu đề tối thiểu 3 ký tự
Không được chọn hạn hoàn thành đã qua
Email đăng ký không được trùng
Mật khẩu tối thiểu 6 ký tự
Kiểm tra email/mật khẩu khi đăng nhập
Kiểm tra quyền sửa/xóa công việc ở phía server
5. UI / UX
Ứng dụng hỗ trợ:

Responsive Desktop / Tablet / Mobile
Dashboard thống kê công việc
Loading State
Empty State
Error State
Skeleton Loading
Thông báo thêm thành công
Thông báo sửa thành công
Thông báo xóa thành công
Xác nhận trước khi xóa
6. Database
Dự án sử dụng PostgreSQL và Prisma ORM.

Các bảng/model chính:

User
Category
Priority
Task
TaskHistory
Quan hệ
User
  |
  | 1 - N
  |
 Task
 / | \
/  |  \
Category Priority TaskHistory
   1-N       1-N
Chi tiết:

User 1 -------- N Task

Category 1 ---- N Task

Priority 1 ---- N Task

Task 1 -------- N TaskHistory
Mỗi Task thuộc về một User, một Category và một Priority.

Một Task có thể có nhiều TaskHistory.

7. Cấu trúc thư mục
project/
│
├── app/
│   ├── admin/
│   │   └── users/
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── actions.ts
│   │
│   ├── tasks/
│   │   ├── create/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   └── actions.ts
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── DeleteTaskButton.tsx
│
├── lib/
│   ├── prisma.ts
│   └── session.ts
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── test-cases.md
├── README.md
├── package.json
└── .env
8. Cài đặt project
Bước 1: Clone repository
git clone <repository-url>
Di chuyển vào thư mục project:

cd <project-folder>
Bước 2: Cài dependencies
npm install
Bước 3: Tạo file .env
Tạo file:

.env
Thêm PostgreSQL connection string:

DATABASE_URL="your-postgresql-connection-string"
Thêm secret dùng cho session:

SESSION_SECRET="your-secret-key"
Không commit file .env chứa thông tin thật lên GitHub.

9. Prisma
Generate Prisma Client:

npx prisma generate
Chạy migration:

npx prisma migrate dev
Nếu project có seed:

npx prisma db seed
Có thể kiểm tra dữ liệu bằng:

npx prisma studio
10. Chạy project
Development:

npm run dev
Sau đó truy cập:

http://localhost:3000
11. Build production
Kiểm tra project trước khi deploy:

npm run build
Nếu build thành công, có thể chạy production local bằng:

npm start
12. Test Cases
Test case của project được lưu tại:

test-cases.md
Các nhóm test chính:

Authentication
Authorization
CRUD Task
Search & Filter
Validation
Loading State
Empty State
Error State
Responsive
Thông báo CRUD
13. Deploy
Ứng dụng được deploy bằng Vercel.

Database production sử dụng PostgreSQL trên Neon.

Các Environment Variables cần cấu hình trên Vercel:

DATABASE_URL
SESSION_SECRET
Sau khi deploy cần kiểm tra lại:

Đăng ký
Đăng nhập
Đăng xuất
Thêm task
Sửa task
Xóa task
Search
Filter
USER authorization
ADMIN authorization
Responsive
14. Tài khoản và phân quyền
Tài khoản đăng ký mới mặc định có role:

USER
Role quản trị:

ADMIN
ADMIN có thể truy cập trang danh sách người dùng.

USER không được phép truy cập khu vực quản trị.

15. Tác giả
Dự án được thực hiện trong chương trình thực tập Web Full-stack.

Project: Personal Task Management
