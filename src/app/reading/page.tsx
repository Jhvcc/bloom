"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ClipboardList } from "lucide-react"
import data from "@/lib/data"

export default function ReadingPage() {
  const [readingMode, setReadingMode] = useState<"english" | "chinese" | "bilingual">("english")
  // const [formattedEnglishText, setFormattedEnglishText] = useState("")
  // const [formattedChineseText, setFormattedChineseText] = useState("")
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

  // Words to highlight in the text
  const highlightedWords = data.words.map((word) => word.word.toLowerCase())


  // Handle word click to show definition
  const handleWordClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    console.log(target)
    // if (target.classList.contains("highlighted-word")) {
    //   const word = target.dataset.word
    //   const wordData = words.find((w) => w.word.toLowerCase() === word?.toLowerCase())

    //   if (wordData) {
    //     alert(`${wordData.word} - ${wordData.definition}`)
    //   }
    // }
  }

  // Format text with emphasized content (wrapped in **)
  const formatEmphasis = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="emphasized-text font-bold text-blue-700">$1</span>')
  }

  // Get bilingual paragraphs for the bilingual mode
  const getBilingualParagraphs = () => {
    const englishParagraphs = data.story.en
    const chineseParagraphs = data.story.zh

    return englishParagraphs.map((english, index) => {
      // Format the English paragraph with highlighted words and emphasis
      let formattedEnglish = formatEmphasis(english)
      highlightedWords.forEach((word) => {
        const regex = new RegExp(`\\b(${word})\\b`, "gi")
        formattedEnglish = formattedEnglish.replace(
          regex,
          `<span class="highlighted-word cursor-pointer hover:bg-yellow-100 transition-colors duration-200" data-word="${word}">$1</span>`,
        )
      })

      return {
        english: formattedEnglish,
        chinese: formatEmphasis(chineseParagraphs[index] || ""),
      }
    })
  }

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - could navigate to quiz
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right - could navigate back to words
    }
    // Reset values
    setTouchStartX(0)
    setTouchEndX(0)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">阅读学习</h2>

      {/* Reading Mode Selector */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setReadingMode("english")}
            className={`px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-900 hover:text-white ${readingMode === "english" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
              }`}
          >
            <span className="mr-2">🇬🇧</span>英文
          </button>
          <button
            onClick={() => setReadingMode("chinese")}
            className={`px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-900 hover:text-white ${readingMode === "chinese" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
              }`}
          >
            <span className="mr-2">🇨🇳</span>中文
          </button>
          <button
            onClick={() => setReadingMode("bilingual")}
            className={`px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-900 hover:text-white ${readingMode === "bilingual" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
              }`}
          >
            <span className="mr-2">🔄</span>双语
          </button>
        </div>
      </div>

      {/* Reading Area */}
      <div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8 max-w-3xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content Area */}
        {readingMode !== "bilingual" ? (
          <div
            className="prose max-w-none text-lg sm:text-xl leading-loose tracking-wide text-gray-800 space-y-8"
            dangerouslySetInnerHTML={{
              __html: (readingMode === "english" ? data.story.en : data.story.zh)
                .map(text => formatEmphasis(text)),
            }}
            onClick={handleWordClick}
          />
        ) : (
          <div className="bilingual-text space-y-12">
            {getBilingualParagraphs().map((paragraph, index) => (
              <div key={index} className="bilingual-pair">
                <div
                  className="english mb-4 text-lg sm:text-xl leading-loose tracking-wide"
                  dangerouslySetInnerHTML={{ __html: paragraph.english }}
                  onClick={handleWordClick}
                />
                <div className="chinese text-base sm:text-lg leading-relaxed text-gray-700 pl-4 border-l-4 border-gray-200">
                  {paragraph.chinese}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Button */}
      <div className="mt-8 text-center">
        <Link
          href="/quiz"
          className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300 transform active:scale-95 shadow-lg inline-flex items-center"
        >
          <ClipboardList className="mr-2" size={18} />
          已完成去测试
        </Link>
      </div>
    </div>
  )
}
