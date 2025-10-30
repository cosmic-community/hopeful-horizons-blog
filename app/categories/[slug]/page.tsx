// app/categories/[slug]/page.tsx
import { getAllCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((cat: Category) => cat.slug === slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: `${category.title} - Hopeful Horizons`,
    description: (category as Category).metadata?.description || `Browse ${category.title} posts`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((cat: Category) => cat.slug === slug);
  
  if (!category) {
    notFound();
  }
  
  const posts = await getPostsByCategory(category.id);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {category.title}
        </h1>
        {(category as Category).metadata?.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {(category as Category).metadata.description}
          </p>
        )}
      </div>

      {/* Category Filter */}
      <CategoryFilter categories={categories as Category[]} activeSlug={slug} />

      {/* Posts Grid */}
      <div className="mt-12">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}