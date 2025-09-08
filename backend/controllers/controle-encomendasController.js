import supabase from '../supabase/client.js';
import { randomUUID } from 'crypto';

export async function cadastrar(req, res) {
  try {
    const { enderecos, data, hora, entregador_id } = req.body;

    console.log('➡️ BODY recebido:', req.body);

    if (!enderecos || enderecos.length === 0 || !data || !hora || !entregador_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const inserts = enderecos.map(endereco => ({
      id: randomUUID(),
      endereco,
      data_entrega: data,     // <== Envia como string YYYY-MM-DD
      hora_entrega: hora,     // <== Envia como string HH:MM
      entregador_id
    }));

    const { data: result, error } = await supabase
      .from('controle_encomendas')  // nome correto com underline
      .insert(inserts);

    if (error) throw error;

    res.json({ message: 'Encomendas cadastradas com sucesso!', data: result });
  } catch (err) {
    console.error('❌ ERRO /controleEncomendas:', err.message || err);
    res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

export async function buscarPorData(req, res) {
  const { data } = req.params;

  const { data: resultados, error } = await supabase
    .from('controle_encomendas')
    .select(`
      id,
      endereco,
      data_entrega,
      hora_entrega,
      entregador_id,
      entregadores (
        nome
      )
    `)
    .eq('data_entrega', data);

  if (error) {
    console.error('❌ ERRO ao buscar por data:', error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log("🔍 Resultado bruto do Supabase:", resultados);

  const formatado = resultados.map(r => ({
    id: r.id,
    endereco: r.endereco,
    data_entrega: r.data_entrega,
    hora_entrega: r.hora_entrega,
    nome_entregador: r.entregadores?.nome || 'Não informado'
  }));

  res.json(formatado);
}


export async function listar(req, res) {
  try {
    const { data, error } = await supabase
      .from('controle_encomendas') // Nome da tabela
      .select(`
        id,
        data,
        hora,
        entregador:entregador_id (
          id,
          nome,
          empresa
        )
      `)
      .order('data', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('❌ ERRO ao listar entregas:', err.message || err);
    res.status(500).json({ error: err.message || 'Erro ao buscar entregas' });
  }
}


