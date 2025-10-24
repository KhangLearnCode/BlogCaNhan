---
layout: ../../layouts/PostLayout.astro
title: "Java cơ bản: Kiểu dữ liệu, biến và cấu trúc chương trình"
description: "Tổng quan Java cơ bản: cách khai báo biến, các kiểu dữ liệu thường dùng và cấu trúc chương trình Java."
pubDate: 2025-10-10
tags: ["Java cơ bản","Java","OOP"]
---

Khi bắt đầu với Java, điều quan trọng nhất là nắm được “khối xây dựng” cơ bản: kiểu dữ liệu, biến, và cấu trúc chương trình. Java là ngôn ngữ lập trình hướng đối tượng, biên dịch sang bytecode chạy trên JVM, nên có tính đa nền tảng (“Write once, run anywhere”). Tuy nhiên, đoạn chương trình nhỏ nhất trong Java thường bắt đầu từ một lớp (class) chứa phương thức `main` làm điểm vào (entry point).

Về kiểu dữ liệu, Java có hai nhóm chính: kiểu nguyên thủy (primitive) và kiểu tham chiếu (reference). Các kiểu nguyên thủy bao gồm `byte, short, int, long` (số nguyên), `float, double` (số thực), `char` (ký tự Unicode), và `boolean` (đúng/sai). Trong khi đó, kiểu tham chiếu dùng cho đối tượng như `String`, mảng, hoặc các class do bạn định nghĩa. Việc phân biệt hai nhóm này giúp bạn hiểu cách dữ liệu được lưu trữ trong bộ nhớ (stack/heap) và cách truyền tham số vào phương thức.

Cú pháp cơ bản để khai báo biến khá trực quan:

```java
int age = 21;
double score = 8.5;
boolean isStudent = true;
String name = "Khang";
```

Cấu trúc một chương trình Java tối thiểu gồm tên gói (tuỳ chọn), khai báo lớp, và phương thức `main`:

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Xin chào Java!");
  }
}
```

Một số lưu ý hữu ích: (1) tên file phải trùng với tên lớp `public`, (2) dùng `System.out.println` để in ra console, (3) phương thức `main` luôn có chữ ký `public static void main(String[] args)`. Khi chương trình lớn dần, bạn sẽ tách code thành nhiều lớp và gói để dễ quản lý.

Cuối cùng, hãy luyện tập với một vài bài tập nhỏ: nhập vào tên và tuổi từ console, tính điểm trung bình, hay chuyển đổi kiểu dữ liệu. Việc hiểu rõ kiểu dữ liệu và biến là nền móng để bạn bước tiếp sang OOP, xử lý ngoại lệ, làm việc với collection và I/O. Chỉ cần nắm vững lõi này, việc học Java sẽ “mượt” hơn rất nhiều!