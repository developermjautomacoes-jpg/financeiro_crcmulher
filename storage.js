// Função serverless da Vercel: guarda e recupera os dados do app num banco
// key-value (Redis, via integração Upstash do Marketplace da Vercel). Isso
// substitui o "window.storage" que só existe dentro do Claude.ai — assim os
// dados ficam permanentes e o link não depende mais de nada do Claude.
//
// A Vercel descontinuou o produto "Vercel KV" próprio (migrado para Upstash
// em dez/2024). Hoje o banco é instalado pelo Marketplace ("Upstash for
// Redis"), mas ele injeta as mesmas variáveis de ambiente de antes
// (KV_REST_API_URL / KV_REST_API_TOKEN), então só trocamos a biblioteca.

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
  automaticDeserialization: false, // guardamos e lemos sempre como texto puro (já é JSON.stringify feito pelo app)
});

export default async function handler(req, res) {
  // Só aceita chaves conhecidas do app, por segurança
  const CHAVES_PERMITIDAS = ['vendas', 'financeiro'];

  if (req.method === 'GET') {
    const { key } = req.query;
    if (!key || !CHAVES_PERMITIDAS.includes(key)) {
      return res.status(400).json({ error: 'chave inválida' });
    }
    try {
      const value = await redis.get(key);
      return res.status(200).json({ value: value || null });
    } catch (err) {
      console.error('Erro ao ler do Redis:', err);
      return res.status(500).json({ error: 'falha ao ler dados' });
    }
  }

  if (req.method === 'POST') {
    const { key, value } = req.body || {};
    if (!key || !CHAVES_PERMITIDAS.includes(key)) {
      return res.status(400).json({ error: 'chave inválida' });
    }
    if (typeof value !== 'string') {
      return res.status(400).json({ error: 'valor precisa ser um texto (JSON.stringify)' });
    }
    try {
      await redis.set(key, value);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Erro ao salvar no Redis:', err);
      return res.status(500).json({ error: 'falha ao salvar dados' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'método não permitido' });
}
