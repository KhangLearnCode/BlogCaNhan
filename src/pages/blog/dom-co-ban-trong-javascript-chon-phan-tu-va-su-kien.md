---
layout: ../../layouts/PostLayout.astro
title: "DOM cơ bản trong JavaScript: Chọn phần tử và sự kiện"
description: "Cách thao tác DOM: querySelector, innerText/HTML, classList, và lắng nghe sự kiện."
pubDate: 2025-10-16
tags: ["JavaScript","DOM","Frontend"]
---

DOM (Document Object Model) là cấu trúc cây biểu diễn tài liệu HTML trong trình duyệt. JavaScript thao tác DOM để thay đổi giao diện, nội dung, hoặc phản ứng với tương tác người dùng. Hai thao tác phổ biến nhất là chọn phần tử (query) và gán sự kiện (event).

Để chọn phần tử, bạn có thể dùng `document.querySelector` (trả về phần tử đầu tiên khớp selector) hoặc `querySelectorAll` (trả về NodeList tất cả phần tử khớp):

```js
const title = document.querySelector('h1.hero-title');
const cards = document.querySelectorAll('.card');
```

Để cập nhật nội dung, sử dụng `textContent` (an toàn, không parse HTML) hoặc `innerHTML` (chèn HTML, cần cẩn trọng XSS). Thêm/xoá class bằng `classList`:

```js
title.textContent = 'Xin chào DOM!';
cards.forEach(c => c.classList.add('highlight'));
```

Sự kiện là cách DOM phát tín hiệu khi có hành động (click, input, submit…). Bạn đăng ký event handler bằng `addEventListener`:

```js
document.querySelector('#btn').addEventListener('click', () => {
  alert('Bạn vừa click nút!');
});
```

Một số thực hành tốt: (1) Chỉ query một lần và tái sử dụng biến, (2) Huỷ đăng ký sự kiện khi không còn dùng để tránh rò rỉ bộ nhớ, (3) Tránh thao tác DOM quá nhiều trong vòng lặp—hãy gộp thay đổi hoặc dùng fragment, (4) Luôn cân nhắc bảo mật khi dùng `innerHTML`.

Trong các dự án lớn, framework như React/Vue/Svelte giúp trừu tượng hoá DOM, quản lý state và cập nhật UI hiệu quả hơn. Dù vậy, hiểu DOM thuần vẫn rất quan trọng để debug, tối ưu hiệu năng, và nắm rõ cách trình duyệt hoạt động.