"use client"

interface HeaderProps {
  onSearch: (query: string) => void
  onHome: () => void
  showSearch: boolean
}

export default function Header({ onSearch, onHome, showSearch }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-strong border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <button onClick={onHome} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-xl">movie</span>
            </div>
            <span className="text-xl font-mts-semibold text-white">Cinema+</span>
          </button>
        </div>
      </div>
    </header>
  )
}
