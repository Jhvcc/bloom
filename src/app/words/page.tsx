"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, Volume2 } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WordsPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [savedWords, setSavedWords] = useState<string[]>([])

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

  const toggleSaveWord = () => {
    if (savedWords.includes(currentWord.id)) {
      setSavedWords(savedWords.filter((word) => word !== currentWord.id))
    } else {
      setSavedWords([...savedWords, currentWord.id])
    }
  }

  return (
    <div
      className="flex flex-col min-h-fit"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">单词学习</h2>

      {/* Card Container - Using flex-grow to take available space */}
      <div className="flex-grow flex justify-center mb-4 sm:mb-8">
        <div className="w-full max-w-md" style={{ perspective: "1000px" }}>
          <div
            className={`relative transition-all duration-500 h-[calc(100vh-20rem)] sm:h-[30rem]`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Card */}
            <Card
              className="p-8 w-full absolute inset-0 overflow-auto"
              style={{
                backfaceVisibility: "hidden",
                zIndex: isFlipped ? 0 : 1,
                transform: "rotateY(0deg)",
              }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSaveWord()
                  }}
                  className={savedWords.includes(currentWord.id) ? "text-yellow-500" : "text-gray-400"}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-center space-y-6 py-10">
                <h3 className="text-3xl font-bold tracking-tight">{currentWord.word}</h3>

                <div className="flex justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>UK:</span>
                    <span>{currentWord.phonetic.uk}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        // playPronunciation("uk")
                      }}
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>US:</span>
                    <span>{currentWord.phonetic.us}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        // playPronunciation("us")
                      }}
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                  {Object.keys(currentWord.part_of_speech).map((pos, index) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {pos}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">点击卡片查看详细信息</div>
            </Card>

            {/* Back Card */}
            <Card
              className="p-6 w-full absolute inset-0 overflow-auto"
              style={{
                backfaceVisibility: "hidden",
                zIndex: isFlipped ? 1 : 0,
                transform: "rotateY(180deg)",
              }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{currentWord.word}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSaveWord()
                  }}
                  className={savedWords.includes(currentWord.id) ? "text-yellow-500" : "text-gray-400"}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-700 mb-1">释义</h4>
                  <div className="text-gray-700 space-y-2">
                    {Object.keys(currentWord.part_of_speech).map((pos, index) => (
                      <div key={index} className="flex">
                        <span className="font-medium text-blue-600 w-12">{pos}</span>
                        <span>{currentWord.part_of_speech[pos as keyof typeof currentWord.part_of_speech]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded-md">
                  <h4 className="font-medium text-purple-700 mb-1">词根解析</h4>
                  <div className="text-gray-700">{currentWord.root_analysis}</div>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium text-green-700 mb-1">例句</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="text-gray-800">{currentWord.sentence_example.en}</div>
                      <div className="text-gray-600">{currentWord.sentence_example.zh}</div>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-amber-50 p-3 rounded-md">
                  <h4 className="font-medium text-amber-700 mb-1">同义词</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentCard.synonyms.map((synonym, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">点击卡片返回</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation - Fixed at bottom with padding */}
      <div className="sticky bottom-0 bg-gray-100 pt-4 pb-8">
        <div className="flex justify-between items-center gap-4 sm:gap-16 max-w-md mx-auto">
          <button
            onClick={prevWord}
            disabled={currentWordIndex === 0}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
          >
            <ChevronLeft className="mr-2" size={16} /> 上一个
          </button>

          <span className="text-sm text-gray-500 whitespace-nowrap">
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
      <div className="h-1 bg-white rounded-sm overflow-hidden fixed bottom-0 left-0 w-full z-40">
        <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}
