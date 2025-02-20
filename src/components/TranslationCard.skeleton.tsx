import PlayIcon from "./PlayIcon";

const TranslationCardSkeleton = () => {
  return (
    <div className="bg-slate-900 w-80 h-auto p-4 rounded-lg text-white font-medium overflow-y-auto">
      <div className="flex flex-col gap-1">
        <div className="drag-handle"></div>
        {/* Word skeleton */}
        <div className="h-8 w-32 bg-slate-700 rounded animate-pulse"></div>
        
        {/* Phonetic skeleton */}
        <div className="flex flex-row items-center gap-2 pb-1">
          <div className="h-5 w-24 bg-slate-700 rounded animate-pulse"></div>
          <div className="animate-pulse">
            <PlayIcon />
          </div>
        </div>
        
        {/* Part of speech lines */}
        <div className="flex flex-col gap-2.5 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-row items-start gap-3">
              <div className="h-6 w-14 bg-slate-700 rounded animate-pulse flex-shrink-0"></div>
              <div className="flex-1 h-6 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TranslationCardSkeleton;