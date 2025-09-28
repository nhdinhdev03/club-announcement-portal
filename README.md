# Club Announcement Portal# Club Announcement Portal



Hệ thống quản lý câu lạc bộ và thông báo được xây dựng với Spring Boot (Backend), React + Vite (Frontend) và SQL Server (Database).Hệ thống quản lý câu lạc bộ và thông báo được xây dựng với Spring Boot (Backend), React (Frontend) và SQL Server (Database).



## 🚀 Tính năng chính## 🚀 Tính năng chính



### 📋 Quản lý câu lạc bộ### 📋 Quản lý câu lạc bộ

- Hiển thị danh sách các câu lạc bộ- Hiển thị danh sách các câu lạc bộ

- Xem chi tiết thông tin câu lạc bộ- Xem chi tiết thông tin câu lạc bộ

- Tìm kiếm câu lạc bộ theo tên- Tìm kiếm câu lạc bộ theo tên

- Thêm, sửa, xóa câu lạc bộ (Admin)- Thêm, sửa, xóa câu lạc bộ (Admin)



### 📢 Quản lý thông báo### 📢 Quản lý thông báo

- Hiển thị danh sách thông báo- Hiển thị danh sách thông báo

- Xem chi tiết thông báo- Xem chi tiết thông báo

- Phân loại thông báo quan trọng- Phân loại thông báo quan trọng

- Tìm kiếm thông báo theo tiêu đề- Tìm kiếm thông báo theo tiêu đề

- Thêm, sửa, xóa thông báo (Admin)- Thêm, sửa, xóa thông báo (Admin)

- Đăng/hủy đăng thông báo- Đăng/hủy đăng thông báo



### 🎯 Trang chủ### 🎯 Trang chủ

- Thống kê tổng quan- Thống kê tổng quan

- Hiển thị thông báo mới nhất- Hiển thị thông báo mới nhất

- Liên kết nhanh đến các chức năng chính- Liên kết nhanh đến các chức năng chính



## 🛠️ Công nghệ sử dụng## 🛠️ Công nghệ sử dụng



### Backend### Backend

- **Java 17**- **Java 17**

- **Spring Boot 3.2.0**- **Spring Boot 3.2.0**

- **Spring Data JPA**- **Spring Data JPA**

- **Spring Web**- **Spring Web**

- **SQL Server**- **SQL Server**

- **Maven**- **Maven**



### Frontend### Frontend

- **React 18**- **React 18**

- **Vite** (Build tool & Dev server)- **React Router DOM**

- **React Router DOM**- **React Bootstrap**

- **React Bootstrap**- **Axios**

- **Axios**- **React Icons**

- **React Icons**

- **Vitest** (Testing framework)### Database

- **ESLint** (Code linting)- **Microsoft SQL Server**



### Database## 📁 Cấu trúc dự án

- **Microsoft SQL Server**

```

## 📁 Cấu trúc dự ánclub-announcement-portal/

├── backend/                 # Spring Boot Backend

```│   ├── src/

club-announcement-portal/│   │   ├── main/

├── backend/                 # Spring Boot Backend│   │   │   ├── java/

│   ├── src/│   │   │   │   └── com/clubportal/

│   │   ├── main/│   │   │   │       ├── controller/    # REST Controllers

│   │   │   ├── java/│   │   │   │       ├── dto/          # Data Transfer Objects

│   │   │   │   └── com/clubportal/│   │   │   │       ├── model/        # JPA Entities

│   │   │   │       ├── controller/    # REST Controllers│   │   │   │       ├── repository/   # JPA Repositories

│   │   │   │       ├── dto/          # Data Transfer Objects│   │   │   │       └── service/      # Business Logic

│   │   │   │       ├── model/        # JPA Entities│   │   │   └── resources/

│   │   │   │       ├── repository/   # JPA Repositories│   │   │       └── application.properties

│   │   │   │       └── service/      # Business Logic│   │   └── test/

│   │   │   └── resources/│   └── pom.xml

│   │   │       └── application.properties├── frontend/               # React Frontend

│   │   └── test/│   ├── public/

│   └── pom.xml│   ├── src/

├── frontend/               # React + Vite Frontend│   │   ├── components/     # React Components

│   ├── public/│   │   ├── pages/         # Page Components

│   ├── src/│   │   ├── services/      # API Services

│   │   ├── components/     # React Components│   │   ├── App.js

│   │   ├── pages/         # Page Components│   │   └── index.js

│   │   ├── services/      # API Services│   └── package.json

│   │   ├── App.jsx├── database/              # Database Scripts

│   │   └── main.jsx│   └── init.sql          # Khởi tạo database và dữ liệu mẫu

│   ├── vite.config.js     # Vite configuration└── README.md

│   ├── eslint.config.js   # ESLint configuration```

│   ├── vitest.config.js   # Vitest configuration

│   ├── index.html         # Entry HTML file## 🚀 Cài đặt và chạy dự án

│   └── package.json

├── database/              # Database Scripts### Yêu cầu hệ thống

│   └── init.sql          # Khởi tạo database và dữ liệu mẫu- Java 17 hoặc cao hơn

├── start.bat             # Windows start script- Node.js 16 hoặc cao hơn

├── start.sh              # Linux/Mac start script- SQL Server (Local hoặc Remote)

└── README.md- Maven 3.6 hoặc cao hơn

```

### 1. Chuẩn bị Database

## 🚀 Cài đặt và chạy dự án

1. Cài đặt SQL Server

### Yêu cầu hệ thống2. Chạy script `database/init.sql` để tạo database và dữ liệu mẫu

- Java 17 hoặc cao hơn

- Node.js 18 hoặc cao hơn```sql

- SQL Server (Local hoặc Remote)-- Chạy file database/init.sql trong SQL Server Management Studio

- Maven 3.6 hoặc cao hơn```



### 1. Chuẩn bị Database### 2. Cấu hình Backend



1. Cài đặt SQL Server1. Di chuyển vào thư mục backend:

2. Chạy script `database/init.sql` để tạo database và dữ liệu mẫu```bash

cd backend

```sql```

-- Chạy file database/init.sql trong SQL Server Management Studio

```2. Cập nhật thông tin database trong `src/main/resources/application.properties`:

```properties

### 2. Cấu hình Backendspring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=club_portal;encrypt=true;trustServerCertificate=true

spring.datasource.username=sa

1. Di chuyển vào thư mục backend:spring.datasource.password=YourPassword123

```bash```

cd backend

```3. Chạy ứng dụng Spring Boot:

```bash

2. Cập nhật thông tin database trong `src/main/resources/application.properties`:mvn spring-boot:run

```properties```

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=club_portal;encrypt=true;trustServerCertificate=true

spring.datasource.username=saBackend sẽ chạy tại: `http://localhost:8080`

spring.datasource.password=YourPassword123

```### 3. Cấu hình Frontend



3. Chạy ứng dụng Spring Boot:1. Di chuyển vào thư mục frontend:

```bash```bash

mvn spring-boot:runcd frontend

``````



Backend sẽ chạy tại: `http://localhost:8080`2. Cài đặt dependencies:

```bash

### 3. Cấu hình Frontend (Vite)npm install

```

1. Di chuyển vào thư mục frontend:

```bash3. Chạy ứng dụng React:

cd frontend```bash

```npm start

```

2. Cài đặt dependencies:

```bashFrontend sẽ chạy tại: `http://localhost:3000`

npm install

```## 📊 API Endpoints



3. Chạy ứng dụng với Vite:### Clubs API

```bash- `GET /api/clubs` - Lấy tất cả câu lạc bộ

# Development mode- `GET /api/clubs/active` - Lấy câu lạc bộ đang hoạt động

npm run dev- `GET /api/clubs/{id}` - Lấy chi tiết câu lạc bộ

# hoặc- `POST /api/clubs` - Tạo câu lạc bộ mới

npm start- `PUT /api/clubs/{id}` - Cập nhật câu lạc bộ

- `DELETE /api/clubs/{id}` - Xóa câu lạc bộ

# Build production- `GET /api/clubs/search?keyword={keyword}` - Tìm kiếm câu lạc bộ

npm run build

### Announcements API

# Preview production build- `GET /api/announcements` - Lấy tất cả thông báo đã đăng

npm run preview- `GET /api/announcements/club/{clubId}` - Lấy thông báo theo câu lạc bộ

- `GET /api/announcements/important` - Lấy thông báo quan trọng

# Run tests- `GET /api/announcements/{id}` - Lấy chi tiết thông báo

npm test- `POST /api/announcements` - Tạo thông báo mới

```- `PUT /api/announcements/{id}` - Cập nhật thông báo

- `DELETE /api/announcements/{id}` - Xóa thông báo

Frontend sẽ chạy tại: `http://localhost:3000`- `PUT /api/announcements/{id}/publish` - Đăng thông báo

- `GET /api/announcements/search?keyword={keyword}` - Tìm kiếm thông báo

### 4. Chạy nhanh với scripts

## 🖼️ Screenshots

**Windows:**

```bash### Trang chủ

start.bat- Hiển thị thống kê tổng quan

```- Danh sách thông báo mới nhất



**Linux/Mac:**### Danh sách câu lạc bộ

```bash- Hiển thị thông tin cơ bản của các câu lạc bộ

chmod +x start.sh- Tính năng tìm kiếm

./start.sh- Liên kết đến trang chi tiết

```

### Chi tiết câu lạc bộ

## ⚡ Lợi ích của Vite- Thông tin đầy đủ về câu lạc bộ

- Danh sách thông báo của câu lạc bộ

- **Khởi động nhanh**: Vite sử dụng ESM và esbuild để tăng tốc độ khởi động

- **Hot Module Replacement (HMR)**: Cập nhật thay đổi ngay lập tức### Danh sách thông báo

- **Build nhanh**: Rollup được tối ưu cho production- Hiển thị tất cả thông báo

- **TypeScript support**: Hỗ trợ TypeScript out-of-the-box- Lọc thông báo quan trọng

- **Plugin ecosystem**: Hệ sinh thái plugin phong phú- Tính năng tìm kiếm



## 📊 API Endpoints### Trang quản lý (Admin)

- Quản lý câu lạc bộ

### Clubs API- Quản lý thông báo

- `GET /api/clubs` - Lấy tất cả câu lạc bộ- Thêm, sửa, xóa dữ liệu

- `GET /api/clubs/active` - Lấy câu lạc bộ đang hoạt động

- `GET /api/clubs/{id}` - Lấy chi tiết câu lạc bộ## 🔧 Tính năng nâng cao

- `POST /api/clubs` - Tạo câu lạc bộ mới

- `PUT /api/clubs/{id}` - Cập nhật câu lạc bộ- **Responsive Design**: Giao diện thân thiện trên mọi thiết bị

- `DELETE /api/clubs/{id}` - Xóa câu lạc bộ- **Search & Filter**: Tìm kiếm và lọc dữ liệu linh hoạt

- `GET /api/clubs/search?keyword={keyword}` - Tìm kiếm câu lạc bộ- **CRUD Operations**: Đầy đủ các thao tác quản lý dữ liệu

- **Data Validation**: Kiểm tra dữ liệu đầu vào

### Announcements API- **Error Handling**: Xử lý lỗi thân thiện người dùng

- `GET /api/announcements` - Lấy tất cả thông báo đã đăng

- `GET /api/announcements/club/{clubId}` - Lấy thông báo theo câu lạc bộ## 🤝 Đóng góp

- `GET /api/announcements/important` - Lấy thông báo quan trọng

- `GET /api/announcements/{id}` - Lấy chi tiết thông báo1. Fork dự án

- `POST /api/announcements` - Tạo thông báo mới2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)

- `PUT /api/announcements/{id}` - Cập nhật thông báo3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)

- `DELETE /api/announcements/{id}` - Xóa thông báo4. Push to branch (`git push origin feature/AmazingFeature`)

- `PUT /api/announcements/{id}/publish` - Đăng thông báo5. Tạo Pull Request

- `GET /api/announcements/search?keyword={keyword}` - Tìm kiếm thông báo

## 📄 License

## 🧪 Testing

Distributed under the MIT License. See `LICENSE` for more information.

Dự án sử dụng Vitest cho testing:

## 📞 Liên hệ

```bash

# Chạy tests- Email: developer@example.com

npm test- GitHub: [https://github.com/nhdinhdev03/club-announcement-portal](https://github.com/nhdinhdev03/club-announcement-portal)



# Chạy tests với UI## 🙏 Acknowledgments

npm run test:ui

- [Spring Boot](https://spring.io/projects/spring-boot)

# Chạy tests với coverage- [React](https://reactjs.org/)

npm run test -- --coverage- [React Bootstrap](https://react-bootstrap.github.io/)

```- [React Icons](https://react-icons.github.io/react-icons/)

## 🔧 Tính năng nâng cao

- **Responsive Design**: Giao diện thân thiện trên mọi thiết bị
- **Search & Filter**: Tìm kiếm và lọc dữ liệu linh hoạt
- **CRUD Operations**: Đầy đủ các thao tác quản lý dữ liệu
- **Data Validation**: Kiểm tra dữ liệu đầu vào
- **Error Handling**: Xử lý lỗi thân thiện người dùng
- **Proxy Configuration**: Vite proxy cho API calls
- **Hot Reload**: Tự động tải lại khi có thay đổi

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- Email: developer@example.com
- GitHub: [https://github.com/nhdinhdev03/club-announcement-portal](https://github.com/nhdinhdev03/club-announcement-portal)

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Icons](https://react-icons.github.io/react-icons/)