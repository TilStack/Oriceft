import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/analyze", async (req, res) => {
    try {
        const userData = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Analyse ces données et retourne uniquement un JSON structuré."
                },
                {
                    role: "user",
                    content: JSON.stringify(userData)
                }
            ]
        });

        const result = completion.choices[0].message.content;

        res.json({ result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});