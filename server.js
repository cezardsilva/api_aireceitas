import express from 'express'
import receitasRoutes from './src/routers/receitas.root.js'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors({
  origin: [
    'http://localhost:5173', // Dev
    'https://seu-front.vercel.app', // Produção
    'https://*.vercel.app' // 👈 Libera TODOS subdomínios Vercel!
  ]
}));

app.use(express.json())

app.use('/api/receitas', receitasRoutes)

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`)
})