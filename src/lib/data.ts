export interface Word {
  id: string
  word: string
  phonetic: {
    uk?: string
    us?: string
  }
  part_of_speech: {
    n?: string
    v?: string
    adj?: string
    adv?: string
    other?: string
  }
  sentence_example: {
    en: string
    zh: string
  }
  root_analysis?: string
}

export interface FullContent {
  story: {
    en: string[]
    zh: string[]
  }
  words: Word[]
}

const data: FullContent = {
  "story": {
    "en": [
      "In modern education, we must **think** about how technology integrates **tightly** with teaching and learning processes.",
      "Handling **large** amounts of data, often representing a **big** opportunity or challenge, requires robust systems.",
      "We write specialized **code** to process this data, breaking it down into units like **token**s.",
      "We then **count** and analyze these tokens within sophisticated multi-**layer** models.",
      "Finally, we **run** these models to gain insights and improve educational outcomes."
    ],
    "zh": [
      "在现代教育中，我们必须**思考**技术如何与教学和学习过程**紧密地**集成。",
      "处理**大量**数据，这些数据往往代表着一个**大的**机遇或挑战，需要强大的系统。",
      "我们编写专门的**代码**来处理这些数据，将其分解成**标记**等单元。",
      "然后我们在复杂的、多**层**的模型中**计算**和分析这些标记。",
      "最后，我们**运行**这些模型以获取见解并改进教育成果。"
    ]
  },
  "words": [
    {
      "id": "tightly",
      "part_of_speech": {
        "adv": "紧密地，牢固地"
      },
      "phonetic": {
        "uk": "\/ˈtaɪtli\/",
        "us": "\/ˈtaɪtli\/"
      },
      "root_analysis": "来自形容词 \"tight\"（紧的）加上副词后缀 \"-ly\"。",
      "sentence_example": {
        "en": "The components fit together **tightly**.",
        "zh": "这些组件**紧密地**扣合在一起。"
      },
      "word": "tightly"
    },
    {
      "id": "big",
      "part_of_speech": {
        "adj": "大的，重要的"
      },
      "phonetic": {
        "uk": "\/bɪɡ\/",
        "us": "\/bɪɡ\/"
      },
      "root_analysis": "古英语 \"bicg\"，可能与表示“膨胀”的日耳曼语族词汇相关。",
      "sentence_example": {
        "en": "This is a **big** step forward for the project.",
        "zh": "这是项目向前迈出的**一大步**。"
      },
      "word": "big"
    },
    {
      "id": "large",
      "part_of_speech": {
        "adj": "大的，大量的"
      },
      "phonetic": {
        "uk": "\/lɑːdʒ\/",
        "us": "\/lɑːrdʒ\/"
      },
      "root_analysis": "源自古法语 \"large\"（宽阔的），最终来自拉丁语 \"largus\"（丰富的，宽大的）。",
      "sentence_example": {
        "en": "We gathered a **large** amount of data.",
        "zh": "我们收集了**大量**数据。"
      },
      "word": "large"
    },
    {
      "id": "think",
      "part_of_speech": {
        "v": "思考，认为"
      },
      "phonetic": {
        "uk": "\/θɪŋk\/",
        "us": "\/θɪŋk\/"
      },
      "root_analysis": "古英语 \"þencan\"（思考），与“þencan”（似乎，想）和“þanc”（想法）相关。",
      "sentence_example": {
        "en": "We need to **think** critically about this issue.",
        "zh": "我们需要批判性地**思考**这个问题。"
      },
      "word": "think"
    },
    {
      "id": "code",
      "part_of_speech": {
        "n": "代码，密码，法规",
        "v": "编码"
      },
      "phonetic": {
        "uk": "\/kəʊd\/",
        "us": "\/koʊd\/"
      },
      "root_analysis": "拉丁语 \"codex\"（树干，木板，书），引申为早期书写形式和规则。",
      "sentence_example": {
        "en": "Learning to write **code** is a valuable skill.",
        "zh": "学习编写**代码**是一项有价值的技能。"
      },
      "word": "code"
    },
    {
      "id": "token",
      "part_of_speech": {
        "n": "象征，代币，凭证；（计算机领域）标记，令牌"
      },
      "phonetic": {
        "uk": "\/ˈtəʊkən\/",
        "us": "\/ˈtoʊkən\/"
      },
      "root_analysis": "古英语 \"tācn\"（标志，象征），与德语 \"Zeichen\" 相关。",
      "sentence_example": {
        "en": "Each word in the sentence can be treated as a **token**.",
        "zh": "句子中的每个词都可以被视为一个**标记**。"
      },
      "word": "token"
    },
    {
      "id": "count",
      "part_of_speech": {
        "n": "计数，总数",
        "v": "计算，计数，认为"
      },
      "phonetic": {
        "uk": "\/kaʊnt\/",
        "us": "\/kaʊnt\/"
      },
      "root_analysis": "古法语 \"conter\"（计数，讲述），源自拉丁语 \"computāre\"（计算）。",
      "sentence_example": {
        "en": "Please **count** how many people are present.",
        "zh": "请**数一下**有多少人在场。"
      },
      "word": "count"
    },
    {
      "id": "run",
      "part_of_speech": {
        "n": "运行，奔跑",
        "v": "运行，跑，管理"
      },
      "phonetic": {
        "uk": "\/rʌn\/",
        "us": "\/rʌn\/"
      },
      "root_analysis": "古英语 \"rinnan\"（流动，跑），与德语 \"rinnen\"（流动）相关。",
      "sentence_example": {
        "en": "The software will **run** on different operating systems.",
        "zh": "这款软件可以在不同的操作系统上**运行**。"
      },
      "word": "run"
    },
    {
      "id": "layer",
      "part_of_speech": {
        "n": "层，层面",
        "v": "分层"
      },
      "phonetic": {
        "uk": "\/ˈleɪə\/",
        "us": "\/ˈleɪər\/"
      },
      "root_analysis": "源自动词 \"lay\"（放置）加上表示“…者”或“…物”的后缀 \"-er\"。",
      "sentence_example": {
        "en": "The painting has multiple **layer**s of color.",
        "zh": "这幅画有**多层**颜色。"
      },
      "word": "layer"
    }
  ]
}

export default data