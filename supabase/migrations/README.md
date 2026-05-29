# Supabase Migrations

## How to apply

1. Go to your Supabase project dashboard
2. Open **SQL Editor**
3. Paste and run each migration file in order:

### 001 (if not yet applied)
Run `001_*.sql` — creates orders, menu, SEO tables.

### 002_page_content.sql ← Run this now
Creates:
- **`page_content`** — one row per page, stores `content` (JSONB) + `seo` (JSONB)
- **`site_content`** — key-value store for global site settings (header, footer, contact, social)
- Seeds default content for all pages
- Enables RLS (public read, authenticated write)

After running, go to **Admin → Pages** to edit any page's content and SEO.

## What each table does

| Table | Purpose |
|-------|---------|
| `page_content` | Full content + SEO for every page (Home, About, Menu, etc.) |
| `site_content` | Site-wide settings: logo, phone, address, social links, Google Analytics ID |
| `menu_categories` | Menu section categories |
| `menu_items` | Individual menu items with prices and images |
| `orders` | Online orders from /order |
| `order_items` | Line items for each order |
| `blog_posts` | Blog articles |
| `bookings` | Table reservations |
| `seo_pages` | Legacy SEO (still read as fallback) |

## Admin panel features

- **Pages tab** → edit content + SEO + custom head HTML + JSON-LD schema for every page
- **Site Settings** (on Home page editor) → edit logo, phone, address, social links, GA ID
- **Menu Manager** → add/edit/delete menu items and categories
- **SEO Manager** → legacy quick-edit for meta tags

## SEO features now active

- `<title>` and `<meta description>` from Supabase per page
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags
- `<link rel="canonical">` auto-generated from SITE_URL
- JSON-LD structured data (configurable per page)
- `robots.txt` at `/robots.txt`
- `sitemap.xml` at `/sitemap.xml` (auto-includes blog posts)
- No-index flag per page
- Custom `<head>` HTML injection per page
- Google Analytics via `site.google_analytics` key in site_content
