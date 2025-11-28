import { OpenAI } from "openai";
import { funFacts } from "./topics.mjs";
import fs from "fs";
import { generateFileName, generateSlug } from "./utils.mjs";
import dotenv from 'dotenv';

dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const outputDir = "output";
const level = "A1-A2"

const client = new OpenAI({
    apiKey: OPEN_AI_KEY,
});


for (const topic of funFacts) {
    console.log(`Processing topic: ${topic}`);

    /**
     * Create directory
     */
    console.log(`Creating directory...`);
    const dirName = generateFileName(generateSlug(topic));
    fs.mkdirSync(`${outputDir}/${dirName}`);

    /**
     * Generate title
     */
    console.log(`Generating title...`);
    const titleResponse = await client.responses.create({
        model: "gpt-5",
        input: `Create a title for modern article for topic: ${topic} in Spanish.`,
        instructions: `This text will be used for Spanish language studies for level ${level}.`,
    });
    
    const title = titleResponse.output_text;
    fs.writeFileSync(`${outputDir}/${dirName}/title.txt`, title);

    /**
     * Generate image
     */
    console.log(`Generating image...`);
    const imageResponse = await client.images.generate({
        model: "dall-e-3",
        prompt: `${topic}`,
        response_format: "url",
        size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url;
    const image = await fetch(imageUrl);
    fs.writeFileSync(`${outputDir}/${dirName}/image.png`, Buffer.from(await image.arrayBuffer()));

    /**
     * Generate text
     */
    console.log(`Generating text...`);
    const textResponse = await client.responses.create({
        model: "gpt-5",
        input: `Create a text for modern article for topic: ${topic} in Spanish. 3 paragraphs with 5 sentences each.`,
        instructions: `This text will be used for Spanish language studies for level ${level}.`,
    });
    
    const text = textResponse.output_text;
    fs.writeFileSync(`${outputDir}/${dirName}/text.txt`, text);

    /**
     * Generate audio for title
     */
    console.log(`Generating audio for title...`);
    const titleAudioResponse = await client.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: title,
        instructions: "Please speak in Spanish with a Castilian accent.",
    });

    const titleAudio = titleAudioResponse;
    fs.writeFileSync(`${outputDir}/${dirName}/title-audio.mp3`, Buffer.from(await titleAudio.arrayBuffer()));

    /**
     * Generate audio for title
     */
    console.log(`Generating audio for text...`);
    const textAudioResponse = await client.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: text,
        instructions: "Please speak in Spanish with a Castilian accent.",
    });

    const textAudio = textAudioResponse;
    fs.writeFileSync(`${outputDir}/${dirName}/text-audio.mp3`, Buffer.from(await textAudio.arrayBuffer()));

    /**
     * Generate title translation
     */
    console.log(`Generating translation for title...`);  
    const titleTranslationResponse = await client.responses.create({
        model: "gpt-5",
        input: `
        Translate into Russian:
        ${title}
        `,
    });
    
    const titleTranslation = titleTranslationResponse.output_text;
    fs.writeFileSync(`${outputDir}/${dirName}/title-translation.txt`, titleTranslation);

    /**
     * Generate text translation
     */
    console.log(`Generating translation for text...`);
    const textTranslationResponse = await client.responses.create({
        model: "gpt-5",
        input: `
        Translate into Russian:
        ${text}
        `,
        instructions: `Keep the same structure of text.`,
    });
    
    const textTranslation = textTranslationResponse.output_text;
    fs.writeFileSync(`${outputDir}/${dirName}/text-translation.txt`, textTranslation);

    console.log(`Done.`);
}
