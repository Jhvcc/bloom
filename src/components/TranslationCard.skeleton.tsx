import PlayIcon from "./PlayIcon";
import { Skeleton } from "./ui/skeleton";

const TranslationCardSkeleton = () => {
  return (
    <div className="bg-slate-900 w-80 h-auto p-4 rounded-lg text-white font-medium overflow-y-auto">
      <div>
        <div className="flex flex-col gap-1">
          <div className="drag-handle"></div>
          <Skeleton className="w-full h-full" />
          <div className="flex flex-row items-center gap-2 font-light text-gray-300 pb-1">
            <Skeleton className="h-full" />
            <PlayIcon />
          </div>
          <div className="flex flex-col gap-2.5">
          <div className="flex flex-row items-start gap-3 text-sm">
            <div className="bg-gray-400 px-2 py-0.5 rounded-lg text-white font-bold flex justify-center items-center w-14 flex-shrink-0">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex flex-row items-start gap-3 text-sm">
            <div className="bg-gray-400 px-2 py-0.5 rounded-lg text-white font-bold flex justify-center items-center w-14 flex-shrink-0">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="w-full h-full" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TranslationCardSkeleton;
