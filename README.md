# Text Image Audio Generator

A Node.js application that generates educational content combining text, images, and audio in multiple languages. Perfect for language learning platforms.

## 🎯 Project Overview

This project generates engaging multilingual learning materials from fun facts. For each topic, it produces:

- **Titles** in Spanish (A1-A2 level)
- **Articles** with structured paragraphs and simple vocabulary
- **Images** generated via DALL-E 3
- **Audio files** with Spanish narration (Castilian accent)
- **Russian translations** for both titles and text
- **Interactive HTML pages** with synchronized sentence highlighting

## 📁 Project Structure

```
.
├── src/
│   ├── index.mjs           # Main content generation script
│   ├── static.mjs          # Static HTML generation from content
│   ├── template.html       # HTML template for lesson pages
│   ├── topics.mjs          # List of fun facts to process
│   └── utils.mjs           # Utility functions (slug generation, timestamps)
├── output/                 # Generated content (HTML, audio, images)
├── package.json            # Project dependencies
├── .env                    # API keys configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- OpenAI API key (for GPT-4, DALL-E 3, and TTS)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
OPEN_AI_KEY=your_openai_api_key_here
```

## 📝 Usage

### Generate Content

Run the main content generation script:

```bash
npm run generate-content
```

This will:
1. Process each topic from `src/topics.mjs`
2. Generate Spanish titles and articles (A1-A2 level)
3. Create DALL-E 3 images
4. Generate Spanish audio (Castilian accent)
5. Translate titles and text to Russian
6. Save all files in `output/{topic-name-with-timestamp}/`

### Generate Static HTML

After generating content, create interactive HTML pages:

```bash
npm run generate-static
```

This will:
1. Read all content directories in `output`
2. Populate the `src/template.html` with generated content
3. Create individual `output/{topic}/index.html` files for each topic
4. Generate a main index linking to all lessons

## 📦 Generated Content Structure

Each topic generates a directory containing:

```
output/topic-name_YYYY-M-D_H-M-S/
├── title.txt                 # Spanish title
├── title-translation.txt     # Russian title translation
├── title-audio.mp3          # Spanish audio for title
├── text.txt                 # Spanish article (3 paragraphs)
├── text-translation.txt     # Russian text translation
├── text-audio.mp3           # Spanish audio for article
├── image.png                # Generated image
└── index.html               # Interactive lesson page
```

## 🎨 Features

### Interactive HTML Pages

The generated pages include:

- **Three-column layout**: Spanish text | Russian translation | Image
- **Audio players** for both title and full text
- **Interactive highlighting**: Hover over sentences in Spanish to highlight the corresponding Russian translation
- **Responsive design** with clean typography
- **Sentence-level synchronization** between source and target language

### Content Generation

- **Bilingual content**: Spanish with Russian translations
- **Language level**: A1-A2 (beginner)
- **Structured articles**: 3 paragraphs, 5 sentences each
- **Native pronunciation**: Spanish with Castilian accent via TTS
- **Custom images**: Generated with DALL-E 3

## 📚 Content Topics

The project includes fun facts about:

- Marine life (sharks, octopuses)
- Astronomy (Venus, stars)
- Biology (sloths, cows, butterflies)
- History and science
- Natural phenomena

See `src/topics.mjs` to add or modify topics.

## 🛠️ Key Functions

### `src/index.mjs`

Main generator that orchestrates the creation pipeline using OpenAI APIs.

### `src/static.mjs`

Processes generated content and creates templated HTML files with proper paragraph formatting and interactive features.

### `src/template.html`

Responsive HTML template featuring:
- Flexbox column layout
- Interactive sentence highlighting
- Audio player controls
- Mobile-friendly design

### `src/utils.mjs`

- `generateFileName()`: Creates timestamped directory names
- `generateSlug()`: Converts topics to URL-friendly slugs

## 🌐 Output

Access generated content at:

- **Main index**: `output/index.html` - Links to all lessons
- **Individual lessons**: `output/{topic-name-with-timestamp}/index.html`

## ⚙️ Configuration

The project uses these OpenAI models:

- **GPT-4o-mini**: Content generation
- **DALL-E 3**: Image generation
- **Text-to-Speech**: Spanish audio generation

Language level is set to **A1-A2** in `src/index.mjs` (line 9).

## 📝 Notes

- API calls are made for each topic, so review your OpenAI usage
- Generated images are downloaded and stored as PNG files
- Audio files are MP3 format with Castilian Spanish accent
- The project maintains proper paragraph structure during translation

## 📄 License

ISC
