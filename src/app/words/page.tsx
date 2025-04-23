"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data"

export default function WordsPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

  const currentWord = data.words[currentWordIndex]
  const progress = ((currentWordIndex + 1) / data.words.length) * 100

  const nextWord = () => {
    if (currentWordIndex < data.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
      setIsFlipped(false)
    }
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
      // Swipe left (next)
      nextWord()
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right (previous)
      prevWord()
    }
    // Reset values
    setTouchStartX(0)
    setTouchEndX(0)
  }

  return (
    <>
      <div
        className="swipe-area"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">单词学习</h2>
        <div className="max-w-md mx-auto">
          <div className="flashcard-container h-64 sm:h-72 mb-6">
            <div className={`flashcard ${isFlipped ? "is-flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
              {/* Front Face */}
              <div className="flashcard-face flashcard-front">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{currentWord.word}</div>
                <div className="text-lg text-gray-600">{currentWord.phonetic.uk}</div>
              </div>

              {/* Back Face */}
              <div className="flashcard-face flashcard-back">
                <div className="w-full h-full flex flex-col">
                  {/* 单词释义部分 */}
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">释义</h3>
                    {currentWord.part_of_speech.n && (
                      <div className="mb-2">
                        <p className="text-gray-800">名词:</p>
                        <p className="text-gray-800">{currentWord.part_of_speech.n}</p>
                      </div>
                    )}
                    {currentWord.part_of_speech.v && (
                      <div className="mb-2">
                        <p className="text-gray-800">动词:</p>
                        <p className="text-gray-800">{currentWord.part_of_speech.v}</p>
                      </div>
                    )}
                    {currentWord.part_of_speech.adj && (
                      <div className="mb-2">
                        <p className="text-gray-800">形容词:</p>
                        <p className="text-gray-800">{currentWord.part_of_speech.adj}</p>
                      </div>
                    )}
                    {currentWord.part_of_speech.adv && (
                      <div className="mb-2">
                        <p className="text-gray-800">副词:</p>
                        <p className="text-gray-800">{currentWord.part_of_speech.adv}</p>
                      </div>
                    )}
                    {currentWord.part_of_speech.other && (
                      <div className="mb-2">
                        <p className="text-gray-800">其他:</p>
                        <p className="text-gray-800">{currentWord.part_of_speech.other}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 词根解析部分 */}
                {currentWord.root_analysis && (
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">词根解析</h3>
                    <p className="text-gray-800">{currentWord.root_analysis}</p>
                  </div>
                )}

                {/* 例句部分 */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">例句</h3>
                  <p className="text-gray-800 italic">{currentWord.sentence_example.en}</p>
                  <p className="text-gray-800 italic">{currentWord.sentence_example.zh}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevWord}
            disabled={currentWordIndex === 0}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
          >
            <ChevronLeft className="mr-2" size={16} /> 上一个
          </button>

          <span className="text-sm text-gray-500">
            {currentWordIndex + 1} / {data.words.length}
          </span>

          {currentWordIndex < data.words.length - 1 ? (
            <button
              onClick={nextWord}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300 transform active:scale-95"
            >
              下一个 <ChevronRight className="ml-2" size={16} />
            </button>
          ) : (
            <Link
              href="/reading"
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300 transform active:scale-95"
            >
              开始阅读 <BookOpen className="ml-2" size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  )
}
