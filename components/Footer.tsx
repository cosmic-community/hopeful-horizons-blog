export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hopeful Horizons
            </h3>
            <p className="text-gray-600">
              Stories of hope, resilience, and new beginnings. Every day is an opportunity to start again.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-gray-600 text-sm">
              A blog featuring inspirational content about technology, travel, and lifestyle. 
              Believe in the power of your dreams and the capacity to transform the future.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Philosophy</h4>
            <p className="text-gray-600 text-sm">
              Life is full of challenges, but together we can build a better world full of possibilities. 
              Never lose faith in what tomorrow can bring.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Hopeful Horizons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}