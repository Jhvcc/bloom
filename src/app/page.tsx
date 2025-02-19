import StoryList from "@/components/StoryList";

export default function Home() {

  const stories = [
    {
      id: "1",
      word: "classify",
      story: "The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced.\n",
    },
    {
      id: "2",
      word: "cancel",
      story: "The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced.\n",
    },
    {
      id: "3",
      word: "cancel",
      story: "The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced. The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced. The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced. The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced. The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced. The algorithm classified her as \"undesirable.\" Shame washed over her as the online mob geared up to cancel her life. Her voice, now silenced.\n",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <StoryList stories={stories} />
      </div>
    </div>
  )
}
