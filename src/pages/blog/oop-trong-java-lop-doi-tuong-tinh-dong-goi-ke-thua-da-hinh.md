---
layout: ../../layouts/PostLayout.astro
title: "OOP trong Java: Lớp, đối tượng, tính đóng gói, kế thừa, đa hình"
description: "Giải thích 4 trụ cột OOP trong Java và cách vận dụng qua ví dụ đơn giản."
pubDate: 2025-10-11
tags: ["OOP","Java","Java cơ bản"]
---

Lập trình hướng đối tượng (OOP) là trái tim của Java. Nó giúp bạn mô hình hóa thế giới thực thông qua lớp (class) và đối tượng (object), tạo nên cấu trúc chương trình rõ ràng, dễ mở rộng. Bốn trụ cột cốt lõi của OOP gồm: đóng gói (encapsulation), kế thừa (inheritance), đa hình (polymorphism) và trừu tượng (abstraction).

- Đóng gói là việc “gói” dữ liệu và hành vi vào cùng một lớp, đồng thời che giấu thông tin bên trong bằng từ khóa truy cập (`private`, `protected`, `public`). Ví dụ, thuộc tính `private` đi kèm getter/setter giúp kiểm soát dữ liệu hợp lệ.
- Kế thừa cho phép một lớp con (subclass) thừa hưởng thuộc tính, phương thức từ lớp cha (superclass), tái sử dụng code và mở rộng hành vi.
- Đa hình cho phép cùng một phương thức, nhưng hành vi khác nhau tùy kiểu đối tượng thực tế ở thời điểm chạy (runtime).
- Trừu tượng là cách định nghĩa “cái gì” hơn là “như thế nào”, thông qua `abstract class` hoặc `interface`.

Ví dụ giản lược:

```java
abstract class Animal {
  private String name;
  public Animal(String name){ this.name = name; }
  public String getName(){ return name; }
  public abstract void speak();
}
class Dog extends Animal {
  public Dog(String name){ super(name); }
  @Override public void speak(){ System.out.println(getName()+": Gâu gâu!"); }
}
class Cat extends Animal {
  public Cat(String name){ super(name); }
  @Override public void speak(){ System.out.println(getName()+": Meo meo!"); }
}
```

Trong đoạn code, `Animal` là lớp trừu tượng định nghĩa hành vi `speak()`. `Dog` và `Cat` kế thừa, và mỗi lớp triển khai cách “speak” khác nhau, minh họa tính đa hình. Bạn có thể làm việc qua interface để tạo hợp đồng rõ ràng, ví dụ `interface Speakable { void speak(); }`.

Một vài thực hành tốt: (1) Ưu tiên ẩn thông tin nhạy cảm, (2) Dùng kế thừa khi có quan hệ “is-a”, còn “has-a” thì ghép (composition), (3) Lập kế hoạch interface trước để tách biệt phần triển khai. Hiểu chắc OOP giúp bạn thiết kế hệ thống sạch, dễ kiểm thử, và bảo trì hiệu quả.