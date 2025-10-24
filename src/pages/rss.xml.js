import rss from '@astrojs/rss';

// Tạo RSS cho các bài trong src/pages/blog/*.md
export async function GET(context) {
  // context.site là URL đầy đủ đã cấu hình trong astro.config.mjs
  const site = new URL(context.site ?? 'https://khandlearncode.github.io/BlogCaNhan');

  // Lấy toàn bộ bài viết (import eager để có frontmatter ngay lúc build)
  const modules = import.meta.glob('./blog/*.md', { eager: true });

  // Chuẩn hoá dữ liệu bài viết
  const posts = Object.entries(modules)
    .map(([path, mod]) => {
      // path ví dụ: ./blog/java-co-ban-kieu-du-lieu-bien-va-cau-truc-chuong-trinh.md
      const slug = path.replace('./blog/', '').replace(/\.md$/, '');
      const fm = mod.frontmatter || {};
      // Tạo link tuyệt đối bảo toàn base (/BlogCaNhan)
      const link = new URL(`./blog/${slug}/`, site).toString();
      return {
        link,
        title: fm.title,
        description: fm.description,
        pubDate: fm.pubDate ? new Date(fm.pubDate) : undefined,
      };
    })
    // Sắp xếp mới nhất trước
    .sort((a, b) => (b.pubDate?.getTime?.() || 0) - (a.pubDate?.getTime?.() || 0));

  return rss({
    title: 'Lê Nguyễn Duy Khang – Blog cá nhân',
    description: 'Chia sẻ Java, JavaScript, lập trình mạng máy tính.',
    site, // có thể là URL object
    items: posts,
  });
}
