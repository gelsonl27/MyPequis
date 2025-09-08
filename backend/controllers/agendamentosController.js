// backend/controllers/agendamentosController.js
import supabase from '../supabase/client.js';

/* util simples para converter string/boolean num boolean consistente */
const toBoolean = (v) => v === true || v === 'true' || v === 1 || v === '1';

export async function cadastrar(req, res) {
  try {
    /* 🔍 log completo do corpo recebido */
    console.log('➡️  POST /agendamentos ‑ BODY recebido:', req.body);

    const {
      nome,
      documento,
      placa = null,
      salao,
      bloco = null,
      apartamento = null,
      data_reserva
    } = req.body;

    /* conversão segura */
    const tem_veiculo = toBoolean(req.body.tem_veiculo);

    /* validações mínimas */
    if (!nome || !documento || !salao || !data_reserva) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    if (isNaN(Number(salao)) || salao < 1 || salao > 4) {
      return res.status(400).json({ error: 'Número de salão inválido (1‑4)' });
    }

    /* inserção no Supabase */
    const { data, error } = await supabase.from('agendamentos').insert([{
      nome,
      documento,
      placa,
      tem_veiculo,
      salao: Number(salao),
      bloco,
      apartamento,
      data_reserva   // deve ser string YYYY‑MM‑DD ou Date
    }]).select().single();

    if (error) throw error;

    console.log('✅  Agendamentos inserido:', data);
    return res.json({ message: 'Agendamentos cadastrado com sucesso!', data });
  } catch (err) {
    console.error('❌  ERRO /agendamentos:', err.message || err);
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

export async function listarPorSalao(req, res) {
  try {
    const { salaoNum } = req.params;
    const hoje = new Date().toISOString().substring(0, 10);      // YYYY‑MM‑DD

    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .eq('salao', Number(salaoNum))
      .eq('data_reserva', hoje)
      .order('nome', { ascending: true });

    if (error) throw error;

    console.log(`📄  GET /agendamentos/${salaoNum} -> ${data.length} registros`);
    return res.json(data);
  } catch (err) {
    console.error('❌  ERRO ao listar agendamentos:', err.message || err);
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

export async function buscarPorPlaca(req, res) {
  try {
    const { placa } = req.params;
    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .eq('placa', placa)
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json(data);
  } catch (err) {
    console.error('❌  ERRO ao buscar agendamento por placa:', err.message || err);
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}


  