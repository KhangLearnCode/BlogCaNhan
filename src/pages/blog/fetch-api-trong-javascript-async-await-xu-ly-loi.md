---
layout: ../../layouts/PostLayout.astro
title: "Fetch API trong JavaScript: async/await và xử lý lỗi"
description: "Gọi API, parse JSON, timeout, và mẫu code an toàn với try/catch."
pubDate: 2025-10-17
tags: ["JavaScript","Fetch API","Web"]
---

Fetch API là chuẩn hiện đại để gửi HTTP request trong trình duyệt (và trong Node.js với `fetch` tích hợp). Thay vì dùng `XMLHttpRequest`, `fetch` cho cú pháp gọn và hoạt động tốt với `Promise`/`async-await`. Ví dụ GET:

```js
async function loadUsers(){
  try{
    const res = await fetch('https://api.example.com/users');
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(data);
  }catch(err){
    console.error('Lỗi tải users:', err);
  }
}
```

Mặc định `fetch` không ném lỗi với HTTP 4xx/5xx, nên bạn cần kiểm tra `res.ok`. Với POST JSON:

```js
async function createNote(content){
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({content})
  });
  if(!res.ok) throw new Error('Tạo ghi chú thất bại');
  return await res.json();
}
```

Vấn đề timeout có thể xử lý bằng `AbortController`:

```js
async function safeFetch(url, ms=8000){
  const ctrl = new AbortController();
  const t = setTimeout(()=> ctrl.abort(), ms);
  try{
    return await fetch(url, { signal: ctrl.signal });
  } finally { clearTimeout(t); }
}
```

Một số lưu ý bảo mật: (1) Không chèn trực tiếp dữ liệu chưa kiểm soát vào `innerHTML`, (2) Với token/bí mật, không hard-code ở frontend, (3) Bật CORS đúng cách từ server, (4) Dùng HTTPS để mã hoá đường truyền.

Cuối cùng, hãy tổ chức lớp “API client” riêng để gom logic gọi API, xử lý lỗi, và tái sử dụng trong toàn app. Điều này giúp code dễ kiểm thử, thay đổi endpoint hoặc header một cách tập trung, tránh trùng lặp.