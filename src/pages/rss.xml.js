import rss from '@astrojs/rss';

export async function GET(context) {
  const site = context.site ?? new URL('https://khandlearncode.github.io/BlogCaNhan');
  const posts = await Astro.glob('./blog/*.md');
  posts.sort((a,b)=> new Date(b.frontmatter.pubDate||0) - new Date(a.frontmatter.pubDate||0));

  return rss({
    title: 'Lê Nguyễn Duy Khang – Blog cá nhân',
    description: 'Chia sẻ Java, JavaScript, lập trình mạng máy tính.',
    site,
    stylesheet: undefined,
    items: posts.map((p) => ({
      link: p.url,
      title: p.frontmatter.title,
      pubDate: p.frontmatter.pubDate ? new Date(p.frontmatter.pubDate) : undefined,
      description: p.frontmatter.description,
    })),
  });
}