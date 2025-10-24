---
layout: ../../layouts/PostLayout.astro
title: "Java Socket: Server/Client – Ví dụ thực tế đơn giản"
description: "Xây dựng server/socket đơn giản với Java TCP để gửi/nhận chuỗi."
pubDate: 2025-10-13
tags: ["Socket","Java","Lập trình mạng"]
---

Sau khi hiểu TCP/UDP, hãy bắt tay vào demo nhỏ dùng TCP. Mục tiêu: tạo server lắng nghe trên cổng 9000, nhận chuỗi từ client và phản hồi lại (echo). Ta dùng `ServerSocket` cho server và `Socket` cho client. Dữ liệu trao đổi dạng văn bản UTF-8 qua `BufferedReader`/`BufferedWriter`.

Server (echo):

```java
try (ServerSocket server = new ServerSocket(9000)) {
  System.out.println("Server started at 9000");
  while (true) {
    Socket client = server.accept();
    new Thread(() -> {
      try (client;
           var in = new java.io.BufferedReader(new java.io.InputStreamReader(client.getInputStream()));
           var out = new java.io.BufferedWriter(new java.io.OutputStreamWriter(client.getOutputStream()))) {
        String line;
        while ((line = in.readLine()) != null) {
          out.write("Server nhận: " + line + "\n");
          out.flush();
        }
      } catch (Exception e) { e.printStackTrace(); }
    }).start();
  }
}
```

Client:

```java
try (Socket socket = new Socket("127.0.0.1", 9000);
     var in = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
     var out = new java.io.BufferedWriter(new java.io.OutputStreamWriter(socket.getOutputStream()))) {
  out.write("Xin chào server!\n"); out.flush();
  String reply = in.readLine();
  System.out.println("Phản hồi: " + reply);
}
```

Một số lưu ý để “production-ready” hơn: (1) Luôn xác định encoding thống nhất (UTF-8), (2) Dùng `\n` hoặc ký tự đặc biệt để đánh dấu cuối gói tin, (3) Mỗi client nên xử lý ở luồng riêng, hoặc tốt hơn là dùng thread pool để tránh tạo quá nhiều luồng, (4) Thêm timeout (`socket.setSoTimeout`) để tránh chờ vô hạn, (5) Logging rõ ràng giúp theo dõi lỗi.

Sau khi chạy thử demo, bạn có thể mở rộng thành chat nhiều người: server quản lý danh sách socket và broadcast tin nhắn, hoặc bổ sung lệnh “/quit”, “/nick”... Những nền tảng cơ bản này rất hữu ích cho các đồ án liên quan đến lập trình mạng.