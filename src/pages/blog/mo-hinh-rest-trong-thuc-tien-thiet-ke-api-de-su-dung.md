---
layout: ../../layouts/PostLayout.astro
title: "Mô hình REST trong thực tiễn: Thiết kế API dễ sử dụng"
description: "Quy ước đặt tên đường dẫn, status code, phân trang, và versioning API."
pubDate: 2025-10-19
tags: ["REST API","Java","Thiết kế API"]
---

Thiết kế REST API tốt giúp client dễ hiểu, backend dễ bảo trì. Bên cạnh các khái niệm cơ bản, bạn nên chuẩn hoá một số quy ước để đội ngũ làm việc hiệu quả hơn.

Đầu tiên là đặt tên đường dẫn (URI). Hãy dùng danh từ số nhiều cho tài nguyên, ví dụ `/api/users`, `/api/orders`. Với bản ghi cụ thể, thêm khóa định danh: `/api/users/123`. Hành động thì thể hiện bằng phương thức HTTP, không nên nhét vào tên đường dẫn như `/api/createUser`. Với quan hệ cha-con, dùng nested route có chừng mực: `/api/users/123/orders`.

Thứ hai là status code. Một vài mã thường gặp: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `500 Internal Server Error`. Hãy trả về mã đúng ngữ nghĩa để client biết cách xử lý.

Phân trang và lọc: dùng tham số truy vấn như `?page=1&size=20&sort=createdAt,desc`. Chuẩn hoá kiểu dữ liệu trả về, ví dụ:

```json
{
  "data": [ /* items */ ],
  "page": 1,
  "size": 20,
  "total": 153
}
```

Về versioning, có thể đặt trong URL (`/api/v1/...`) hoặc header. Version giúp thay đổi lớn mà không phá vỡ client cũ. Chuẩn JSON phản hồi nên thống nhất cấu trúc lỗi, ví dụ:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Người dùng không tồn tại"
  }
}
```

Cuối cùng là bảo mật: bật HTTPS, kiểm soát CORS, dùng JWT/OAuth2, và hạn chế lộ thông tin nhạy cảm trong thông báo lỗi. Monitoring (log tập trung, trace ID), rate limit, và cache cũng rất quan trọng. Khi những quy ước này được áp dụng đồng bộ, API của bạn sẽ dễ dùng, dễ mở rộng và thân thiện với cả frontend lẫn đối tác tích hợp.