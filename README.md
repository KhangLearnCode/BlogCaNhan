# Blog cá nhân – Lê Nguyễn Duy Khang 

Blog hiện đại, responsive, tối ưu SEO cơ bản, viết bằng Astro. Chủ đề: Java, JavaScript, lập trình mạng.

## Tính năng
- SSG với Astro → build ra HTML tĩnh, chạy nhanh, dễ deploy GitHub Pages
- Giao diện portfolio-developer, hiệu ứng hover/animation nhẹ
- SEO cơ bản: meta title/description/keywords
- Trang:
  - Home (giới thiệu, liên kết mạng xã hội)
  - Blog (grid 3 cột, liệt kê bài viết)
  - About, Contact, Projects (tuỳ chọn)
- 9+ bài viết tiếng Việt (Java/JS/Networking)
- Workflow GitHub Actions tự động deploy GitHub Pages


## Deploy lên GitHub Pages

1) Tạo repository mới trên GitHub (ví dụ): `blog-ca-nhan-khang`

2) Khởi tạo git và push code:
```bash
git init
git add .
git commit -m "feat: initial Astro blog for Khang"
git branch -M main
git remote add origin https://github.com/KhangLearnCode/blog-ca-nhan-khang.git
git push -u origin main
```

3) Bật Pages
- Vào Settings → Pages
- Source: GitHub Actions
- Sau khi workflow chạy xong (Actions tab), trang sẽ có link dạng:
  https://khanglearncode.github.io/blog-ca-nhan-khang/

4) Tuỳ chọn cấu hình `site`/`base`
- Nếu muốn đường dẫn tuyệt đối chính xác cho OG/canonical, chỉnh `site` trong `astro.config.mjs` thành URL Pages của repo.
- Astro không bắt buộc `base`, nhưng nếu dùng, đặt `base: '/blog-ca-nhan-khang'`.

## Tùy biến
- Màu sắc/typography: `src/styles/global.css`
- Navigation: `src/components/Nav.astro`
- Thông tin footer: `src/components/Footer.astro`
- SEO mặc định: `src/layouts/BaseLayout.astro` + `src/layouts/PostLayout.astro`
- Bài viết: thêm file `.md` vào `src/pages/blog/` (giữ frontmatter tương tự)



## Tham khảo
- Astro Docs: https://docs.astro.build/

- GitHub Pages: https://pages.github.com/

