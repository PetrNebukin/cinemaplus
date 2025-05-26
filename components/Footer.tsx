export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 border-t border-navy-800 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-navy-400 space-y-2 md:space-y-0">
          <p>© {currentYear} Cinema+ на платформе NBKN.RU</p>
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-center md:text-right">
            <a
              href="https://t.me/nbkncinemaplus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Telegram-канал
            </a>
            <a
              href="https://adguard-dns.io/ru/public-dns.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Убрать рекламу
            </a>
            <a
              href="https://www.donationalerts.com/r/nbkn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Поддержать проект
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
