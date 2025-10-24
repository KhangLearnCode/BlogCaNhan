export function slugify(s: string) {
  return s
    .toString()
    .normalize('NFD')                // bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')    // bỏ ký tự không hợp lệ cho slug
    .trim()
    .replace(/\s+/g, '-')            // khoảng trắng => dấu gạch
    .replace(/-+/g, '-');            // gộp nhiều dấu gạch
}