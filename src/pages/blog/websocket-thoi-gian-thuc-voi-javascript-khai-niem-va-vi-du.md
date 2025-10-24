---
layout: ../../layouts/PostLayout.astro
title: "WebSocket thời gian thực với JavaScript: Khái niệm và ví dụ"
description: "Giới thiệu WebSocket và ví dụ nhỏ kết nối/nhận tin nhắn từ server."
pubDate: 2025-10-18
tags: ["JavaScript","WebSocket","Realtime"]
---

WebSocket là giao thức hai chiều, giữ kết nối mở giữa client và server, rất phù hợp cho ứng dụng thời gian thực như chat, thông báo, game. Khác với HTTP (request/response), WebSocket cho phép server chủ động đẩy dữ liệu xuống client bất cứ lúc nào sau khi bắt tay (handshake).

Ở phía frontend, API rất đơn giản:

```js
const ws = new WebSocket('wss://echo.websocket.org');
ws.addEventListener('open', () => {
  console.log('Đã kết nối');
  ws.send('Xin chào WebSocket!');
});
ws.addEventListener('message', (e) => {
  console.log('Tin nhắn:', e.data);
});
ws.addEventListener('close', () => console.log('Đã đóng'));
ws.addEventListener('error', (err) => console.error('Lỗi', err));
```

Khi triển khai thực tế, bạn sẽ có server WebSocket riêng (Node.js `ws`, Spring Boot `stomp`/`sockjs`, hoặc Netty/Vert.x trong Java). Luồng điển hình: client kết nối -> xác thực (nếu cần) -> tham gia phòng/kênh -> nhận/broadcast thông điệp. Đừng quên cơ chế ping/pong hoặc heartbeat để phát hiện kết nối “chết”.

Một số lưu ý: (1) Sử dụng `wss://` (TLS) trên môi trường production, (2) Nếu có chức năng phòng, cần kiểm soát quyền truy cập, (3) Thiết kế payload gọn nhẹ (JSON tối giản), (4) Xử lý lại kết nối (reconnect) với backoff khi mạng chập chờn, (5) Theo dõi số kết nối và giới hạn tài nguyên để tránh quá tải.

Khi kết hợp với backend Java, bạn có thể dùng Spring WebSocket + STOMP để tách routing thông điệp giống REST, hoặc dùng Netty cho hiệu năng cao. Dù chọn công nghệ nào, hãy bắt đầu từ một demo nhỏ để hiểu vòng đời kết nối và mô hình hoá sự kiện trong ứng dụng của bạn.