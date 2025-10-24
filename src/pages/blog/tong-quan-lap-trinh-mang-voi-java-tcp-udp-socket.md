---
layout: ../../layouts/PostLayout.astro
title: "Tổng quan lập trình mạng với Java: TCP, UDP, Socket"
description: "Hiểu cơ bản về TCP/UDP và cách Java cung cấp API Socket cho giao tiếp mạng."
pubDate: 2025-10-12
tags: ["Lập trình mạng","Socket","Java"]
---

Lập trình mạng cho phép các ứng dụng trao đổi dữ liệu qua Internet hoặc mạng nội bộ. Trong mô hình TCP/IP, hai giao thức phổ biến là TCP và UDP. TCP là giao thức hướng kết nối, đảm bảo độ tin cậy (đúng thứ tự, không mất gói), phù hợp cho ứng dụng cần tính chính xác như HTTP, FTP. UDP thì “nhẹ”, không đảm bảo, thích hợp cho streaming, game thời gian thực, nơi tốc độ quan trọng hơn sự hoàn hảo.

Java cung cấp các lớp trong gói `java.net` để làm việc với socket—điểm cuối của giao tiếp mạng. Với TCP, bạn sẽ dùng `ServerSocket` (phía máy chủ) và `Socket` (phía máy khách). Còn UDP sử dụng `DatagramSocket` và `DatagramPacket`. Việc chọn giao thức phụ thuộc vào yêu cầu bài toán: độ trễ, tin cậy, mức độ phức tạp.

Ví dụ mô hình TCP cơ bản:
- Server lắng nghe trên cổng (port), chấp nhận kết nối đến.
- Client kết nối tới địa chỉ IP:port của server.
- Hai bên trao đổi dữ liệu qua luồng vào/ra (InputStream/OutputStream).
- Đóng kết nối khi xong việc.

Code mẫu skeleton TCP server:

```java
try (ServerSocket server = new ServerSocket(9000)) {
  while (true) {
    Socket client = server.accept();
    // Tạo luồng mới xử lý client
  }
}
```

Trong khi đó, UDP không có khái niệm “kết nối”:

```java
try (DatagramSocket socket = new DatagramSocket(9001)) {
  byte[] buf = new byte[1024];
  DatagramPacket packet = new DatagramPacket(buf, buf.length);
  socket.receive(packet);
  // Xử lý dữ liệu trong packet
}
```

Một số lưu ý: (1) Hãy thiết kế giao thức ứng dụng rõ ràng (ví dụ: tiền tố độ dài gói tin), (2) Luôn xử lý ngoại lệ, timeout, và đóng tài nguyên đúng cách (try-with-resources), (3) Dùng thread pool hoặc NIO khi cần hiệu năng cho nhiều kết nối đồng thời. Việc nắm vững khái niệm nền tảng sẽ giúp bạn tự tin xây dựng từ các demo nhỏ đến hệ thống mạng phức tạp.