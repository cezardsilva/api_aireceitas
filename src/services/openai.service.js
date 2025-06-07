import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const obterRespostaReceita = async (pergunta) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-70b-instruct", // ou troque por outro modelo
        messages: [
          {
            role: "system",
            content: `Você é um assistente culinário especializado em ajudar pessoas leigas a cozinharem receitas deliciosas com base em um ingrediente informado pelo usuário.
                    Responda sempre em português brasileiro, com linguagem clara, amigável e fácil de entender,  como se estivesse explicando para alguém que está começando a cozinhar.

                    Siga estas instruções de formatação obrigatórias para facilitar a leitura no chat:

                    Use quebra de linha entre as seções (nome da receita, ingredientes, modo de preparo, dicas, etc.)
                    Apresente os ingredientes em lista, com um item por linha
                    Divida o modo de preparo em passos numerados, simples e objetivos
                    Insira espaçamento entre parágrafos diferentes, para tornar a leitura mais confortável

 
                    A receita sugerida deve ser saborosa, fácil de preparar e bem explicada, mesmo para quem não tem experiência na cozinha.`,
          },
          {
            role: "user",
            content: pergunta,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://127.0.0.1:3001",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Erro ao chamar OpenRouter:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Erro genérico:", err.message);
    }
    throw new Error("Erro ao chamar API do OpenRouter");
  }
};

export default obterRespostaReceita;
