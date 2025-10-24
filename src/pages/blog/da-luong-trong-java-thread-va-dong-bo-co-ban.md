---
layout: ../../layouts/PostLayout.astro
title: "Đa luồng trong Java: Thread và đồng bộ cơ bản"
description: "Tạo luồng, Runnable, synchronized và những lưu ý cạnh tranh tài nguyên."
pubDate: 2025-10-14
tags: ["Java","Đa luồng","Concurrency"]
---

Trong các ứng dụng mạng hoặc xử lý I/O, đa luồng (multithreading) giúp chương trình phản hồi tốt hơn khi có nhiều tác vụ diễn ra cùng lúc. Java hỗ trợ đa luồng qua lớp `Thread` và interface `Runnable`. Bạn có thể tạo luồng bằng cách kế thừa `Thread` hoặc truyền một `Runnable` cho `Thread`.

Ví dụ tạo luồng đơn giản:

```java
class Worker implements Runnable {
  private final int id;
  Worker(int id){ this.id = id; }
  public void run(){
    System.out.println("Worker " + id + " bắt đầu");
    // Giả lập công việc
    try { Thread.sleep(500); } catch (InterruptedException ignored){}
    System.out.println("Worker " + id + " kết thúc");
  }
}
public class Main {
  public static void main(String[] args) throws Exception {
    new Thread(new Worker(1)).start();
    new Thread(new Worker(2)).start();
  }
}
```

Khi nhiều luồng cùng truy cập tài nguyên chung (biến, cấu trúc dữ liệu), ta cần đồng bộ để tránh race condition. Từ khóa `synchronized` đảm bảo chỉ một luồng vào vùng tới hạn:

```java
class Counter {
  private int value = 0;
  public synchronized void inc(){ value++; }
  public synchronized int get(){ return value; }
}
```

Tuy nhiên, đồng bộ thái quá sẽ gây nghẽn. Thực tế, bạn nên dùng các tiện ích trong `java.util.concurrent`: `ExecutorService` (quản lý thread pool), `ConcurrentHashMap`, `BlockingQueue`, `CompletableFuture`… Chúng giúp kiểm soát tài nguyên, tránh tự tay quản lý luồng.

Một số lưu ý: (1) Luôn biết dữ liệu nào là “shared state”, (2) Tránh lock lồng nhau để hạn chế deadlock, (3) Dùng bất biến (immutability) khi có thể, (4) Ưu tiên pattern bất đồng bộ (async) để cải thiện throughput. Với kiến thức này, bạn sẽ dễ dàng mở rộng server socket để phục vụ hàng trăm kết nối đồng thời.