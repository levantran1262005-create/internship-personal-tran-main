# TEST CASES - PERSONAL TASK MANAGEMENT

## 1. Authentication

### TC01 - Đăng ký tài khoản hợp lệ
- Nhập họ tên, email mới và mật khẩu từ 6 ký tự.
- Kết quả mong đợi: tài khoản USER được tạo và chuyển về trang đăng nhập.

### TC02 - Đăng ký bằng email đã tồn tại
- Nhập email của một tài khoản đã có.
- Kết quả mong đợi: hiển thị thông báo "Email đã tồn tại".

### TC03 - Đăng ký với mật khẩu dưới 6 ký tự
- Nhập mật khẩu dưới 6 ký tự.
- Kết quả mong đợi: không cho đăng ký hoặc hiển thị lỗi validation.

### TC04 - Đăng nhập hợp lệ
- Nhập đúng email và mật khẩu.
- Kết quả mong đợi: đăng nhập thành công và chuyển đến Dashboard.

### TC05 - Đăng nhập sai mật khẩu
- Nhập email đúng nhưng mật khẩu sai.
- Kết quả mong đợi: hiển thị "Email hoặc mật khẩu không đúng".

### TC06 - Đăng nhập với email không tồn tại
- Nhập email chưa được đăng ký.
- Kết quả mong đợi: hiển thị "Email hoặc mật khẩu không đúng".

### TC07 - Đăng xuất
- Đăng nhập rồi bấm "Đăng xuất".
- Kết quả mong đợi: session bị xóa và chuyển về trang đăng nhập.


## 2. Authorization

### TC08 - USER truy cập trang quản trị
- Đăng nhập bằng tài khoản USER.
- Truy cập `/admin/users`.
- Kết quả mong đợi: USER bị chuyển về trang chủ.

### TC09 - ADMIN xem danh sách người dùng
- Đăng nhập bằng tài khoản ADMIN.
- Mở trang danh sách người dùng.
- Kết quả mong đợi: hiển thị các tài khoản trong hệ thống.

### TC10 - USER chỉ xem task của mình
- Đăng nhập bằng hai tài khoản USER khác nhau.
- Kết quả mong đợi: mỗi USER chỉ nhìn thấy task thuộc tài khoản của mình.

### TC11 - USER sửa task của người khác
- USER cố truy cập URL edit của task thuộc USER khác.
- Kết quả mong đợi: hệ thống từ chối và chuyển về trang chủ.

### TC12 - USER xóa task của người khác
- Gửi yêu cầu xóa task thuộc USER khác.
- Kết quả mong đợi: server từ chối xóa.


## 3. CRUD Task

### TC13 - Thêm công việc hợp lệ
- Nhập đầy đủ thông tin hợp lệ.
- Kết quả mong đợi: task được lưu vào PostgreSQL và hiển thị ở Dashboard.

### TC14 - Tiêu đề để trống
- Không nhập tiêu đề.
- Kết quả mong đợi: không cho submit.

### TC15 - Tiêu đề dưới 3 ký tự
- Nhập tiêu đề: `AB`.
- Kết quả mong đợi: validation từ chối tạo task.

### TC16 - Chọn ngày đã qua
- Chọn dueDate nhỏ hơn ngày hiện tại.
- Kết quả mong đợi: không cho tạo công việc.

### TC17 - Sửa công việc
- Thay đổi tiêu đề, danh mục, mức ưu tiên hoặc trạng thái.
- Kết quả mong đợi: dữ liệu được cập nhật thành công.

### TC18 - Xóa công việc
- Bấm nút "Xóa".
- Kết quả mong đợi: xuất hiện hộp thoại xác nhận.

### TC19 - Hủy xóa
- Bấm Xóa rồi chọn Cancel.
- Kết quả mong đợi: task vẫn tồn tại.

### TC20 - Xác nhận xóa
- Bấm Xóa rồi chọn OK.
- Kết quả mong đợi: task được xóa khỏi database và Dashboard.


## 4. Search & Filter

### TC21 - Tìm kiếm có kết quả
- Nhập từ khóa tồn tại trong tiêu đề.
- Kết quả mong đợi: chỉ hiển thị task phù hợp.

### TC22 - Tìm kiếm không có kết quả
- Nhập từ khóa không tồn tại.
- Kết quả mong đợi: hiển thị trạng thái không có dữ liệu.

### TC23 - Lọc trạng thái TODO
- Chọn "Chưa làm".
- Kết quả mong đợi: chỉ hiển thị task có trạng thái TODO.

### TC24 - Lọc trạng thái IN_PROGRESS
- Chọn "Đang làm".
- Kết quả mong đợi: chỉ hiển thị task có trạng thái IN_PROGRESS.

### TC25 - Lọc trạng thái COMPLETED
- Chọn "Hoàn thành".
- Kết quả mong đợi: chỉ hiển thị task có trạng thái COMPLETED.

### TC26 - Kết hợp tìm kiếm và lọc
- Nhập từ khóa và chọn trạng thái.
- Kết quả mong đợi: chỉ hiển thị task thỏa mãn cả hai điều kiện.


## 5. UI / UX

### TC27 - Empty State
- Đăng nhập bằng USER chưa có task.
- Kết quả mong đợi: hiển thị giao diện "Chưa có công việc".

### TC28 - Loading State
- Truy cập route trong lúc hệ thống đang tải dữ liệu.
- Kết quả mong đợi: hiển thị Skeleton Loading.

### TC29 - Error State
- Khi route phát sinh lỗi không được xử lý.
- Kết quả mong đợi: hiển thị giao diện thông báo lỗi và nút "Thử lại".

### TC30 - Responsive
- Kiểm tra giao diện trên Desktop, Tablet và Mobile.
- Kết quả mong đợi: giao diện tự điều chỉnh và không bị tràn ngang.


## 6. Thông báo

### TC31 - Thông báo thêm thành công
- Tạo task hợp lệ.
- Kết quả mong đợi: Dashboard hiển thị thông báo thêm thành công.

### TC32 - Thông báo sửa thành công
- Cập nhật task.
- Kết quả mong đợi: Dashboard hiển thị thông báo cập nhật thành công.

### TC33 - Thông báo xóa thành công
- Xác nhận xóa task.
- Kết quả mong đợi: Dashboard hiển thị thông báo xóa thành công.