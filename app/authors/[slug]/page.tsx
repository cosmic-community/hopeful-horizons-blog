// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllPosts } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const authorSlugs = new Set<string>();
  
  posts.forEach((post) => {
    const author = (post as Post).metadata?.author;
    if (author) {
      authorSlugs.add(author.slug);
    }
  });
  
  return Array.from(authorSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }
  
  return {
    title: `${author.title} - Hopeful Horizons`,
    description: (author as Author).metadata?.bio || `Posts by ${author.title}`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const authorData = await getAuthorBySlug(slug);
  
  if (!authorData) {
    notFound();
  }
  
  const author = authorData as Author;
  const posts = await getPostsByAuthor(author.id);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        {author.metadata?.profile_picture && (
          <img 
            src={`${author.metadata.profile_picture.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-32 h-32 rounded-full mx-auto mb-6"
            width={128}
            height={128}
          />
        )}
        
        <h1 className="text-4xl font-bold mb-4">
          {author.title}
        </h1>
        
        {author.metadata?.bio && (
          <p className="text-xl text-gray-600 mb-6">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {author.metadata?.twitter && (
            <a 
              href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Twitter
            </a>
          )}
          {author.metadata?.linkedin && (
            <a 
              href={`https://${author.metadata.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Posts by {author.title}</h2>
        
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post as Post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No posts by this author yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}