import 'dotenv/config';
import OpenAI from 'openai';
import express from 'express';

const app = express();
const port = 3000;

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.get('/translate', async (req, res) => {
	try {
		const response = await openai.chat.completions.create({
		  model: 'gpt-4',
		  messages: [{
			role: 'user',
			content: `translate this JSON file and return key/value translation JSON: ${req.body.json}`
		}],
		  temperature: 0,
		  max_tokens: 1000,
		});
		res.status(200).json(response);
	  } catch (err) {
		res.status(500).json((err as Error).message);
	  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});