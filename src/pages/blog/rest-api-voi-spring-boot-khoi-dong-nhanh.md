---
layout: ../../layouts/PostLayout.astro
title: "REST API với Spring Boot: Khởi động nhanh"
description: "Giới thiệu REST, tạo controller GET/POST cơ bản với Spring Boot."
pubDate: 2025-10-15
tags: ["Java","Spring Boot","REST API"]
---

Khi xây dựng ứng dụng web hoặc mobile, REST API là cách phổ biến để client và server trao đổi dữ liệu qua HTTP. Trong hệ sinh thái Java, Spring Boot giúp khởi tạo dự án nhanh chóng, cấu hình tối thiểu. Với Spring Initializr, bạn có thể chọn các starter như `spring-web`, `spring-data-jpa`… và tải về skeleton.

Một ví dụ API ghi chú (notes) cơ bản:

```java
@RestController
@RequestMapping("/api/notes")
public class NoteController {
  private final List<String> notes = new java.util.concurrent.CopyOnWriteArrayList<>();

  @GetMapping
  public List<String> all(){ return notes; }

  @PostMapping
  public ResponseEntity<String> add(@RequestBody String content){
    notes.add(content);
    return ResponseEntity.status(HttpStatus.CREATED).body("OK");
  }
}
```

Trong ví dụ trên, `@RestController` giúp trả JSON thay vì HTML, `@GetMapping` phục vụ danh sách ghi chú, `@PostMapping` thêm ghi chú mới. Khi triển khai thực tế, bạn sẽ tách thành các layer: controller (HTTP), service (business), repository (dữ liệu), đi kèm DTO và validate đầu vào.

Một số nguyên tắc REST: (1) Tài nguyên (resource) được biểu diễn qua URL (ví dụ `/api/notes/123`), (2) Sử dụng phương thức HTTP phù hợp: GET/POST/PUT/PATCH/DELETE, (3) Trả mã trạng thái (status code) chính xác, (4) Phản hồi JSON rõ ràng và nhất quán, (5) Thêm phân trang, lọc, sort khi danh sách dài, (6) Ghi log và xử lý lỗi toàn cục bằng `@ControllerAdvice`.

Nếu bạn quan tâm đến bảo mật, hãy tìm hiểu JWT/OAuth2, CORS và triển khai HTTPS. Spring Security có thể hỗ trợ hầu hết kịch bản thường gặp. Từ một controller đơn giản, bạn có thể dần mở rộng thành hệ thống API hoàn chỉnh, tích hợp với frontend (React/JS) hoặc client mobile.