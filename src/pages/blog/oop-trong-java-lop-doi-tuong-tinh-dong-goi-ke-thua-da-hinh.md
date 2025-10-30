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

---

## 1) Đóng gói (Encapsulation) với kiểm soát bất biến

Giữ dữ liệu ở trạng thái hợp lệ bằng cách ẩn trường (`private`) và chỉ cho thao tác qua phương thức công khai.

```java
public class BankAccount {
  private final String owner;   // bất biến sau khi khởi tạo
  private long balance;         // đơn vị: VND

  public BankAccount(String owner, long initialBalance) {
    if (owner == null || owner.isBlank()) throw new IllegalArgumentException("Owner required");
    if (initialBalance < 0) throw new IllegalArgumentException("Initial balance >= 0");
    this.owner = owner;
    this.balance = initialBalance;
  }

  public String getOwner() { return owner; }
  public long getBalance() { return balance; }

  public void deposit(long amount) {
    if (amount <= 0) throw new IllegalArgumentException("amount > 0");
    balance += amount;
  }

  public void withdraw(long amount) {
    if (amount <= 0) throw new IllegalArgumentException("amount > 0");
    if (amount > balance) throw new IllegalStateException("Insufficient funds");
    balance -= amount;
  }
}
```

- Ưu tiên bất biến (`final`) cho dữ liệu không đổi.
- Kiểm soát đầu vào trong setter/method để giữ “invariant” (quy tắc luôn đúng).

---

## 2) Kế thừa vs. Ghép (Composition)

Chỉ dùng kế thừa khi mối quan hệ “is-a”. Nếu là “has-a”, hãy dùng composition.

```java
// KHÔNG NÊN: Car extends Engine (Car không phải là Engine)
class Engine { void start(){} }
class Car /* extends Engine */ {
  private final Engine engine = new Engine(); // has-a
  public void start(){ engine.start(); }
}
```

Ưu điểm của composition:
- Giảm coupling với lớp cha.
- Dễ thay thế thành phần qua interface (ví dụ chiến lược động).

---

## 3) Trừu tượng: Abstract class vs Interface

- Abstract class: chia sẻ một phần trạng thái/hành vi, có thể có field và constructor.
- Interface: chỉ hợp đồng; hỗ trợ multiple inheritance (implements nhiều interface), có `default`/`static` method.

Ví dụ “chiến lược nén” (Strategy):

```java
interface Compressor {
  byte[] compress(byte[] input);
  default String name(){ return getClass().getSimpleName(); }
}
class GzipCompressor implements Compressor {
  @Override public byte[] compress(byte[] input){
    // demo: mô phỏng
    return ("GZIP:" + input.length).getBytes();
  }
}
class BrotliCompressor implements Compressor {
  @Override public byte[] compress(byte[] input){
    return ("BROTLI:" + input.length).getBytes();
  }
}
class FileService {
  private Compressor compressor;
  public FileService(Compressor compressor){ this.compressor = compressor; }
  public void setCompressor(Compressor c){ this.compressor = c; } // thay đổi chiến lược runtime
  public byte[] save(byte[] content){ return compressor.compress(content); }
}
```

---

## 4) Đa hình (Polymorphism) với danh sách đối tượng cùng “hợp đồng”

Ví dụ hệ hình học:

```java
interface Shape {
  double area();
  double perimeter();
}

class Circle implements Shape {
  private final double r;
  Circle(double r){ this.r = r; }
  public double area(){ return Math.PI * r * r; }
  public double perimeter(){ return 2 * Math.PI * r; }
}

class Rectangle implements Shape {
  private final double w, h;
  Rectangle(double w, double h){ this.w = w; this.h = h; }
  public double area(){ return w * h; }
  public double perimeter(){ return 2*(w + h); }
}

class ShapesDemo {
  public static void main(String[] args) {
    java.util.List<Shape> shapes = java.util.List.of(
      new Circle(2.5),
      new Rectangle(4, 6)
    );
    double total = 0;
    for (Shape s : shapes) {
      System.out.printf("%s: area=%.2f, peri=%.2f%n",
        s.getClass().getSimpleName(), s.area(), s.perimeter());
      total += s.area();
    }
    System.out.println("Total area = " + total);
  }
}
```

- Không cần `instanceof` khi dùng đúng interface — chỉ cần gọi phương thức trên “hợp đồng”.

---

## 5) Overriding vs Overloading

```java
class Printer {
  // Overloading: cùng tên, khác tham số
  void print(String s){ System.out.println("String: " + s); }
  void print(int n){ System.out.println("Int: " + n); }
}

class ColorPrinter extends Printer {
  // Overriding: thay đổi hành vi phương thức cha
  @Override void print(String s){ System.out.println("[Color] " + s); }
}

class Demo {
  public static void main(String[] args) {
    Printer p = new ColorPrinter();   // upcasting
    p.print("Hello");                 // gọi bản override (runtime dispatch)
    p.print(123);                     // overload dựa theo chữ ký tham số (compile time)
  }
}
```

---

## 6) Ép kiểu, upcasting/downcasting an toàn

```java
Animal a = new Dog("Milu"); // upcasting -> an toàn
a.speak();                  // Gâu gâu!

if (a instanceof Dog d) {   // Pattern matching for instanceof (Java 16+)
  d.speak();                // Không cần cast thủ công
}
```

- Chỉ downcast khi “chắc chắn kiểu cụ thể”, ưu tiên dùng polymorphism tránh `instanceof` rải rác.

---

## 7) Bất biến (Immutable) và `record`

Bất biến giúp thread-safe tự nhiên, ít lỗi side-effect.

```java
public final class Point {
  private final int x, y;
  public Point(int x, int y){ this.x = x; this.y = y; }
  public int x(){ return x; }
  public int y(){ return y; }
  public Point move(int dx, int dy){ return new Point(x + dx, y + dy); }
}
```

Từ Java 16+, `record` rút gọn:

```java
public record PointR(int x, int y) {
  public PointR move(int dx, int dy){ return new PointR(x + dx, y + dy); }
}
```

---

## 8) Áp dụng nguyên lý SOLID (tóm lược)

- S – Single Responsibility: mỗi lớp làm một việc (ví dụ `FileService` chỉ xử lý lưu file, không hiển thị UI).
- O – Open/Closed: mở rộng qua interface/implements, đóng với sửa trực tiếp.
- L – Liskov Substitution: lớp con thay thế lớp cha mà không phá vỡ hành vi kỳ vọng.
- I – Interface Segregation: tách interface lớn thành interface nhỏ, chuyên biệt.
- D – Dependency Inversion: phụ thuộc vào abstraction (interface), không phụ thuộc vào implement cụ thể (xem `Compressor` ở trên).

---

## 9) Mini project: Quản lý nhân sự (OOP “đủ vị”)

- Mục tiêu: mô tả `Employee` (abstraction), các loại `FullTime`, `Contractor` (kế thừa), tính lương (đa hình), ẩn thông tin lương (đóng gói), và chiến lược thưởng (composition).

```java
interface BonusPolicy { double bonus(double salaryBase); }
class NoBonus implements BonusPolicy { public double bonus(double base){ return 0; } }
class PerformanceBonus implements BonusPolicy {
  private final double rate; // 0.0 - 1.0
  public PerformanceBonus(double rate){ this.rate = rate; }
  public double bonus(double base){ return base * rate; }
}

abstract class Employee {
  private final String id, name;
  private final BonusPolicy bonusPolicy;
  protected Employee(String id, String name, BonusPolicy bp){
    if (id == null || id.isBlank()) throw new IllegalArgumentException("id");
    this.id = id; this.name = name; this.bonusPolicy = bp;
  }
  public String id(){ return id; }
  public String name(){ return name; }
  protected abstract double baseSalary();
  public double totalSalary(){ return baseSalary() + bonusPolicy.bonus(baseSalary()); }
}

class FullTime extends Employee {
  private final double monthly;
  public FullTime(String id, String name, double monthly, BonusPolicy bp){
    super(id, name, bp); this.monthly = monthly;
  }
  protected double baseSalary(){ return monthly; }
}

class Contractor extends Employee {
  private final int hours; private final double hourly;
  public Contractor(String id, String name, int hours, double hourly, BonusPolicy bp){
    super(id, name, bp); this.hours = hours; this.hourly = hourly;
  }
  protected double baseSalary(){ return hours * hourly; }
}

class HRApp {
  public static void main(String[] args) {
    java.util.List<Employee> staff = java.util.List.of(
      new FullTime("E01","An", 15_000_000, new PerformanceBonus(.2)),
      new Contractor("E02","Bình", 120, 120_000, new NoBonus())
    );
    staff.forEach(e -> System.out.printf("%s (%s): %, .0f VND%n",
      e.name(), e.getClass().getSimpleName(), e.totalSalary()));
  }
}
```

- Thay `BonusPolicy` là bạn đổi chiến lược thưởng mà không sửa lớp con → thỏa mãn OCP/DIP.

---

## 10) Mẹo thực hành tốt

- Luôn viết `@Override` khi override để trình biên dịch bắt lỗi chữ ký.
- Giảm `public`; mặc định `package-private` khi không cần public API.
- Ưu tiên `constructor`/`factory` bất biến; dùng `builder` khi có nhiều tham số.
- Viết `equals()`, `hashCode()`, `toString()` cho entity; với `record` đã có sẵn.
- Test đơn vị cho hành vi lớp (ví dụ `BankAccount` nạp/rút hợp lệ).

---

## 11) Bài tập gợi ý

1) Viết hệ `Media` với `Audio`, `Video`, `Image` (polymorphism), thêm `Transcoder` (Strategy).  
2) Thiết kế `Notification` với `Email`, `SMS`, `Push` và một `Notifier` thay đổi kênh gửi lúc chạy.  
3) Chuyển ví dụ `ShapesDemo` sang đọc danh sách từ file JSON, tạo đối tượng tương ứng (Factory).

---

### Tổng kết

- Hãy chọn đúng công cụ: trừu tượng hóa qua `interface/abstract class`, tái sử dụng bằng **composition** trước, chỉ **kế thừa** khi thật sự “is-a”.
- Viết code “hợp đồng trước, chi tiết sau”, kiểm soát bất biến để hệ thống ổn định, dễ mở rộng.



