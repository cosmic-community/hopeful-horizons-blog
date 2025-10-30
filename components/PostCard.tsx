import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const categories = post.metadata?.categories;
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img 
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            width={400}
            height={225}
          />
        </Link>
      )}
      
      <div className="p-6">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        {/* Author */}
        {showAuthor && author && (
          <div className="flex items-center gap-3 pt-4 border-t">
            {author.metadata?.profile_picture && (
              <img 
                src={`${author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            )}
            <div>
              <Link 
                href={`/authors/${author.slug}`}
                className="font-medium text-sm hover:text-blue-600 transition-colors"
              >
                {author.title}
              </Link>
            </div>
          </div>
        )}
        
        {/* Read More Link */}
        <Link 
          href={`/posts/${post.slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}