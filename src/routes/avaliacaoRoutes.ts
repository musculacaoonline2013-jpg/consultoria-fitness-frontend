// src/routes/avaliacaoRoutes.ts

import { Router, Response } from 'express';
import { prisma } from '../server.ts';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.ts';

const avaliacaoRouter = Router();

// Protege todas as rotas de avaliação
avaliacaoRouter.use(authMiddleware); 

// ROTA: Salvar/Atualizar Rascunho da Avaliação (UPSERT)
// Endpoint: POST /avaliacoes/:alunoId
avaliacaoRouter.post('/:alunoId', async (req: AuthRequest, res: Response) => {
    const professorId = req.professorId;
    const alunoId = parseInt(req.params.alunoId);
    const respostas = req.body; // Dados completos do formulário (JSON)

    if (!professorId || isNaN(alunoId)) {
        return res.status(400).json({ error: 'ID do Professor ou Aluno inválido.' });
    }

    try {
        // 1. Verificar se o Aluno pertence ao Professor (Segurança Multi-Tenant)
        const aluno = await prisma.aluno.findUnique({
            where: { id: alunoId, professorId: professorId }
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado ou não pertence ao seu perfil.' });
        }

        // 2. Usar o UPSERT para atualizar ou criar o rascunho
        const avaliacao = await prisma.avaliacao.upsert({
            where: { alunoId: alunoId }, // Procura uma avaliação existente para este aluno
            update: {
                respostasJson: respostas,
                dataAtualizacao: new Date(),
                // Se for a última etapa, o status seria atualizado para "Finalizado"
            },
            create: {
                alunoId: alunoId,
                professorId: professorId,
                respostasJson: respostas,
                status: "Rascunho",
            },
        });

        res.json({ message: 'Rascunho salvo com sucesso!', avaliacaoId: avaliacao.id });

    } catch (error) {
        console.error('Erro ao salvar rascunho:', error);
        res.status(500).json({ error: 'Erro interno ao salvar o rascunho.' });
    }
});

export default avaliacaoRouter;