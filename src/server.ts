// src/server.ts (Atualizado)

// ... (Outros imports)
import alunoRouter from './routes/alunoRoutes.ts'; 
import avaliacaoRouter from './routes/avaliacaoRoutes.ts'; // IMPORTAR A NOVA ROTA

// ... (Restante do código)

app.use(express.json()); 

// Rota de Autenticação (Aberta)
app.use('/auth', authRouter); 

// Rota de Alunos (Protegida)
app.use('/alunos', alunoRouter); 

// Rota de Avaliações (Protegida)
app.use('/avaliacoes', avaliacaoRouter); // NOVO: Conecta o salvamento de rascunhos

// ... (Restante do código)