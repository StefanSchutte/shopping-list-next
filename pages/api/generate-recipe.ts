import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        console.log('Received query:', query);

        // explicit instructions for the model to return only valid JSON
        const prompt = `Generate a recipe for "${query}" in valid JSON format with the following structure:
{
  "title": "Recipe Title",
  "ingredients": [
    {
      "item": "ingredient name",
      "quantity": number,
      "unit": "measurement unit",
      "category": "food category"
    }
  ],
  "instructions": ["step 1", "step 2", "..."],
  "tips": ["tip 1", "tip 2", "..."]
}
You must return ONLY this JSON with no explanations, markdown formatting, or additional text.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    role: 'system',
                    content: 'You are a recipe generator that outputs ONLY valid JSON without any explanation, introduction, or markdown code blocks.'
                },
                { role: 'user', content: prompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.5,
            max_tokens: 1000,
        });

        const text = response.choices[0]?.message?.content?.trim();
        if (!text) {
            console.error('Empty response from OpenAI');
            return res.status(500).json({ error: 'Empty response from OpenAI' });
        }

        try {
            const jsonResponse = JSON.parse(text);

            if (!jsonResponse.title || !jsonResponse.ingredients || !jsonResponse.instructions) {
                console.error('Invalid recipe structure:', jsonResponse);
                return res.status(500).json({ error: 'Invalid recipe structure' });
            }

            // Return the parsed JSON directly
            return res.status(200).json(jsonResponse);
        } catch (error) {
            console.error('Failed to parse OpenAI response:', error);

            // If direct parsing failed, try to extract JSON from response
            // This is a fallback in case the model returned additional text
            try {
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const extractedJson = JSON.parse(jsonMatch[0]);
                    return res.status(200).json(extractedJson);
                }
            } catch (extractError) {
                console.error('Failed to extract JSON:', extractError);
            }

            return res.status(500).json({ error: 'Failed to parse OpenAI response' });
        }
    } catch (error) {
        console.error('API Error:', error);

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to generate recipe';

        const errorDetails = error instanceof Error
            ? error.toString()
            : String(error);

        return res.status(500).json({
            error: errorMessage,
            details: errorDetails
        });
    }
}