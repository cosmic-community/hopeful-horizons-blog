import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hopeful Horizons
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover stories of hope, resilience, and new beginnings. Every day brings an opportunity to start again.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter categories={categories as Category[]} />

      {/* Posts Grid */}
      <div className="mt-12">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}