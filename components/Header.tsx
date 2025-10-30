import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hopeful Horizons
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}