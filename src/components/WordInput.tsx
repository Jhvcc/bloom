'use client';

import { useState } from "react";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { Loader2, Plus, Shuffle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Badge } from "./ui/badge";
import { readJson } from "@/services/read-json";


interface WordInputProps {
  selectedWords: string[]
  onWordsChange: (words: string[]) => void
}

const WordInput = ({ selectedWords, onWordsChange }: WordInputProps) => {
  const [inputValue, setInputValue] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddWord = async () => {
    const word = inputValue.trim().toLowerCase()

    if (!word) return

    if (selectedWords.includes(word)) {
      setError("This word is already in your list")
      return
    }

    if (selectedWords.length >= 5) {
      setError("You can only add up to 5 words")
      return
    }

    setIsChecking(true)
    setError(null)

    try {
      // Simulate API call to check if word exists in dictionary
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add your actual dictionary check here
      const wordExists = true // This would be your API check result

      if (wordExists) {
        onWordsChange([...selectedWords, word])
        setInputValue("")
      } else {
        setError("Word not found in dictionary")
      }
    } catch {
      setError("Failed to check word. Please try again.")
    } finally {
      setIsChecking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddWord()
    }
  }

  const handleRemoveWord = (wordToRemove: string) => {
    onWordsChange(selectedWords.filter(word => word !== wordToRemove))
  }

  const generateRandomWords = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Simulate API delay
      const dictionary: string[] = await readJson("BEC_2")
      // In real implementation, you would:
      // 1. Call your dictionary API to get random words
      // 2. Filter out any inappropriate words
      // 3. Ensure words are at appropriate difficulty level

      // For now, we'll use the mock dictionary
      const numberOfWordsNeeded = 10 - selectedWords.length
      const availableWords = dictionary.filter((word) => !selectedWords.includes(word))
      const randomWords = availableWords.sort(() => Math.random() - 0.5).slice(0, numberOfWordsNeeded)

      onWordsChange([...selectedWords, ...randomWords])
    } catch {
      setError("Failed to generate random words. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const clearAllWords = () => {
    onWordsChange([])
    setError(null)
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Type a word and press enter..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setError(null)
            }}
            onKeyDown={handleKeyPress}
            disabled={isChecking || isGenerating}
          />
        </div>
        <Button
          onClick={handleAddWord}
          disabled={!inputValue ||isChecking || isGenerating}
        >
          {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={generateRandomWords}
          disabled={isGenerating || isChecking}
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shuffle className="w-4 h-4" />}
          Generate Random Words
        </Button>

        {selectedWords.length > 0 && (
          <Button variant="outline" size="icon" onClick={clearAllWords} disabled={isChecking || isGenerating}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        {selectedWords.map((word) => (
          <Badge
            key={word}
            variant="secondary"
            className="cursor-pointer text-sm"
            onClick={() => handleRemoveWord(word)}
          >
            {word}
          </Badge>
        ))}

        {selectedWords.length === 0 && (
          <p className="text-sm text-muted-foreground">No words added yet. Type a word or generate random words.</p>
        )}
      </div>

      {selectedWords.length > 0 && (
        <div className="text-sm text-muted-foreground">{selectedWords.length} words added</div>
      )}
    </div>
  )
}

export default WordInput