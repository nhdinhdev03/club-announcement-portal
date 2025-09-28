-- Tạo database
CREATE DATABASE club_portal;
GO

-- Sử dụng database
USE club_portal;
GO

-- Tạo bảng clubs
CREATE TABLE clubs
(
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NTEXT,
    logo_url NVARCHAR(500),
    founded_date DATETIME2,
    contact_email NVARCHAR(255),
    contact_phone NVARCHAR(50),
    address NVARCHAR(500),
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tạo bảng announcements
CREATE TABLE announcements
(
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(500) NOT NULL,
    content NTEXT NOT NULL,
    author NVARCHAR(255),
    is_important BIT DEFAULT 0,
    is_published BIT DEFAULT 0,
    published_date DATETIME2,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    club_id BIGINT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

-- Tạo indexes
CREATE INDEX IX_clubs_name ON clubs(name);
CREATE INDEX IX_clubs_is_active ON clubs(is_active);
CREATE INDEX IX_announcements_club_id ON announcements(club_id);
CREATE INDEX IX_announcements_is_published ON announcements(is_published);
CREATE INDEX IX_announcements_is_important ON announcements(is_important);
CREATE INDEX IX_announcements_published_date ON announcements(published_date);

-- Chèn dữ liệu mẫu
INSERT INTO clubs
    (name, description, contact_email, contact_phone, address, founded_date, is_active)
VALUES
    (N'Câu lạc bộ Công nghệ thông tin', N'Câu lạc bộ dành cho những người yêu thích công nghệ, lập trình và khoa học máy tính.', 'it.club@example.com', '0123456789', N'Tòa nhà A, Trường Đại học XYZ', '2020-01-15', 1),
    (N'Câu lạc bộ Thể thao', N'Câu lạc bộ tập hợp những người yêu thích thể thao và hoạt động thể chất.', 'sports.club@example.com', '0987654321', N'Sân thể thao, Trường Đại học XYZ', '2019-09-01', 1),
    (N'Câu lạc bộ Văn học', N'Câu lạc bộ dành cho những người yêu thích văn học, thơ ca và viết lách.', 'literature.club@example.com', '0555666777', N'Thư viện trung tâm, Trường Đại học XYZ', '2018-03-20', 1),
    (N'Câu lạc bộ Âm nhạc', N'Câu lạc bộ âm nhạc với các hoạt động biểu diễn và học tập âm nhạc.', 'music.club@example.com', '0333444555', N'Phòng âm nhạc, Trường Đại học XYZ', '2021-05-10', 1),
    (N'Câu lạc bộ Nhiếp ảnh', N'Câu lạc bộ dành cho những người đam mê nhiếp ảnh và nghệ thuật hình ảnh.', 'photo.club@example.com', '0111222333', N'Studio nhiếp ảnh, Trường Đại học XYZ', '2020-08-30', 0);

-- Chèn dữ liệu thông báo mẫu
INSERT INTO announcements
    (title, content, author, is_important, is_published, published_date, club_id)
VALUES
    (N'Thông báo tuyển thành viên mới CLB Công nghệ thông tin',
        N'Câu lạc bộ Công nghệ thông tin thông báo tuyển thành viên mới cho năm học 2024-2025.

Yêu cầu:
- Là sinh viên các ngành liên quan đến CNTT
- Có đam mê với công nghệ và lập trình
- Có thời gian tham gia các hoạt động CLB

Đăng ký tại: it.club@example.com
Hạn đăng ký: 30/10/2024',
        N'Nguyễn Văn A', 1, 1, GETDATE(), 1),

    (N'Lịch tập luyện thể thao tuần này',
        N'Thông báo lịch tập luyện thể thao trong tuần:

- Thứ 2: Bóng đá (16:00 - 18:00)
- Thứ 4: Bóng chuyền (17:00 - 19:00) 
- Thứ 6: Bóng rổ (16:30 - 18:30)
- Chủ nhật: Giải đấu giao hữu

Địa điểm: Sân thể thao trường
Liên hệ: 0987654321',
        N'Trần Thị B', 0, 1, GETDATE(), 2),

    (N'Cuộc thi viết văn "Tình yêu quê hương"',
        N'Câu lạc bộ Văn học tổ chức cuộc thi viết văn với chủ đề "Tình yêu quê hương".

Thể loại: Truyện ngắn, thơ, tản văn
Độ dài: Không quá 2000 từ
Giải thưởng: 
- Giải nhất: 2.000.000 VNĐ
- Giải nhì: 1.000.000 VNĐ
- Giải ba: 500.000 VNĐ

Hạn nộp bài: 15/11/2024
Nộp bài tại: literature.club@example.com',
        N'Lê Văn C', 1, 1, GETDATE(), 3),

    (N'Đêm nhạc "Tuổi trẻ và ước mơ"',
        N'Câu lạc bộ Âm nhạc tổ chức đêm nhạc "Tuổi trẻ và ước mơ".

Thời gian: 19:00, thứ 7 ngày 25/10/2024
Địa điểm: Hội trường A, trường Đại học XYZ
Nội dung: Các tiết mục ca hát, nhạc cụ của thành viên CLB

Vé miễn phí cho sinh viên
Đăng ký tham dự: music.club@example.com',
        N'Phạm Thị D', 0, 1, GETDATE(), 4),

    (N'Workshop chụp ảnh chân dung',
        N'CLB Nhiếp ảnh tổ chức workshop "Kỹ thuật chụp ảnh chân dung cơ bản".

Thời gian: 14:00 - 17:00, Chủ nhật 27/10/2024
Địa điểm: Studio nhiếp ảnh
Giảng viên: Nhiếp ảnh gia chuyên nghiệp

Phí tham gia: 100.000 VNĐ/người
Bao gồm: Tài liệu, thực hành, certificate

Đăng ký: photo.club@example.com
Số lượng: 20 người (đăng ký sớm)',
        N'Vũ Văn E', 0, 1, GETDATE(), 5);

-- Cập nhật thời gian published_date cho các thông báo
UPDATE announcements SET published_date = DATEADD(hour, -id, GETDATE()) WHERE is_published = 1;

-- Kiểm tra dữ liệu
    SELECT 'Clubs' as TableName, COUNT(*) as RecordCount
    FROM clubs
UNION ALL
    SELECT 'Announcements', COUNT(*)
    FROM announcements;

SELECT c.name as ClubName, COUNT(a.id) as AnnouncementCount
FROM clubs c
    LEFT JOIN announcements a ON c.id = a.club_id AND a.is_published = 1
GROUP BY c.id, c.name
ORDER BY c.name;