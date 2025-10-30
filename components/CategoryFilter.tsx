import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Link
        href="/"
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
          !activeSlug
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            activeSlug === category.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}