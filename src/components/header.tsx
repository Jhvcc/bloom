"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Import, Settings } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  const navItems = [
    { name: "单词学习", path: "/words" },
    { name: "阅读学习", path: "/reading" },
    { name: "理解测试", path: "/quiz" },
    { name: "学习成就", path: "/achievement" },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link
          href="/words"
          className="text-xl font-black text-gray-800 font-serif cursor-pointer hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
        >
          英语学习
        </Link>

        <div className="hidden sm:flex ml-auto space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-2 px-1 transition-all duration-300 ${isActive(item.path)
                ? "text-gray-800 border-b-2 border-gray-800 font-semibold"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Added Import and Settings links */}
          <Link
            href="/import"
            className={`py-2 px-1 transition-all duration-300 flex items-center ${isActive("/import")
              ? "text-gray-800 border-b-2 border-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Import className="h-4 w-4 mr-1" />
            导入
          </Link>

          <Link
            href="/settings"
            className={`py-2 px-1 transition-all duration-300 flex items-center ${isActive("/settings")
              ? "text-gray-800 border-b-2 border-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Settings className="h-4 w-4 mr-1" />
            设置
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 focus:outline-none">
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-2 z-40">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block w-full text-left px-4 py-2 text-sm ${isActive(item.path) ? "text-gray-800 font-semibold" : "text-gray-700"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Added Import and Settings links to mobile menu */}
          <Link
            href="/import"
            className={`block w-full text-left px-4 py-2 text-sm flex items-center ${isActive("/import") ? "text-gray-800 font-semibold" : "text-gray-700"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Import className="h-4 w-4 mr-2" />
            导入词典
          </Link>

          <Link
            href="/settings"
            className={`block w-full text-left px-4 py-2 text-sm flex items-center ${isActive("/settings") ? "text-gray-800 font-semibold" : "text-gray-700"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2" />
            个人中心
          </Link>
        </div>
      )}
    </header>
  )
}
