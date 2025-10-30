// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: (post as Post).metadata?.excerpt || 'Read this post on Hopeful Horizons',
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);
  
  if (!postData) {
    notFound();
  }
  
  const post = postData as Post;
  const author = post.metadata?.author;
  const categories = post.metadata?.categories;
  const featuredImage = post.metadata?.featured_image;
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-auto"
            width={800}
            height={450}
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.title}
        </h1>
        
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Author */}
        {author && (
          <div className="flex items-center gap-4 pt-4 border-t">
            {author.metadata?.profile_picture && (
              <img 
                src={`${author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
            )}
            <div>
              <Link 
                href={`/authors/${author.slug}`}
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                {author.title}
              </Link>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-600">
                  {author.metadata.bio.substring(0, 100)}...
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {post.metadata?.content || ''}
        </ReactMarkdown>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}