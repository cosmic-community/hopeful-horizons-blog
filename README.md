# Hopeful Horizons Blog

![App Preview](https://imgix.cosmicjs.com/857645f0-b599-11f0-84b8-c1eed342c5b6-photo-1470071459604-3b5ec3a7fe05-1761833141257.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and Cosmic CMS, featuring inspirational content about technology, travel, and lifestyle. The application embodies themes of hope, resilience, and new beginnings.

## ✨ Features

- **Dynamic Content Management** - All content powered by Cosmic CMS for easy updates
- **Category Filtering** - Browse posts by Technology, Travel, or Lifestyle categories
- **Author Profiles** - Dedicated pages for each author with their complete post collection
- **Responsive Design** - Optimized viewing experience across all devices
- **SEO Optimized** - Server-side rendering with dynamic metadata
- **Modern UI/UX** - Clean interface with smooth animations and hover effects
- **TypeScript** - Full type safety throughout the application
- **Markdown Support** - Rich content formatting for blog posts

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69037002271316ad9f4cd70d&clone_repository=690372bc271316ad9f4cd75b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories. A vida é cheia de desafios e incertezas, mas é importante lembrar que cada novo dia traz consigo a oportunidade de recomeçar. As dificuldades podem parecer grandes, mas também nos tornam mais fortes e resilientes. A esperança é uma luz que nos guia, mesmo nos momentos mais sombrios. Acredite no poder do seu sonho e na capacidade de transformar o futuro. Juntos, podemos construir um mundo melhor, repleto de possibilidades. Nunca perca a fé no que o amanhã pode trazer!"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories. A vida é cheia de desafios e incertezas, mas é importante lembrar que cada novo dia traz consigo a oportunidade de recomeçar. As dificuldades podem parecer grandes, mas também nos tornam mais fortes e resilientes. A esperança é uma luz que nos guia, mesmo nos momentos mais sombrios. Acredite no poder do seu sonho e na capacidade de transformar o futuro. Juntos, podemos construir um mundo melhor, repleto de possibilidades. Nunca perca a fé no que o amanhã pode trazer!', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket
- Git for version control

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hopeful-horizons-blog
```

2. Install dependencies:
```bash
bun install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

5. Run the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1)
```

### Filtering Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.categories': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🔧 Cosmic CMS Integration

This application uses three main content types:

### Posts
- Title (text)
- Content (markdown)
- Featured Image (file)
- Author (object relationship)
- Categories (objects relationship)
- Excerpt (textarea)

### Authors
- Name (text)
- Bio (textarea)
- Profile Picture (file)
- Twitter (text)
- LinkedIn (text)

### Categories
- Name (text)
- Description (textarea)

All relationships are automatically loaded using the `depth(1)` parameter, providing nested object data in a single query.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in project settings:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Set these in your deployment platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## 📖 Project Structure

```
├── app/
│   ├── page.tsx              # Home page with all posts
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx      # Individual post page
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx      # Author profile page
│   └── categories/
│       └── [slug]/
│           └── page.tsx      # Category filter page
├── components/
│   ├── Header.tsx            # Site header
│   ├── Footer.tsx            # Site footer
│   ├── PostCard.tsx          # Post preview card
│   ├── CategoryFilter.tsx    # Category navigation
│   └── CosmicBadge.tsx       # Cosmic attribution
├── lib/
│   └── cosmic.ts             # Cosmic SDK setup
├── types.ts                  # TypeScript definitions
└── public/
    └── dashboard-console-capture.js  # Console logging
```

## 🎨 Customization

### Styling
All styles use Tailwind CSS. Modify colors and spacing in `tailwind.config.js` and component files.

### Content
All content is managed through your Cosmic CMS dashboard. Add, edit, or remove posts, authors, and categories without touching code.

### Typography
The application uses the Inter font family. Update in `app/layout.tsx` to change fonts.

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Support

For issues or questions:
- Check the [Cosmic documentation](https://www.cosmicjs.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

---

Built with ❤️ using Cosmic CMS

<!-- README_END -->