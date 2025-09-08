import supabase from '../supabase/client.js';

export async function cadastrar(req, res) {
    const { codigo, destinatario, bloco, apartamento, tipo, entregador_id} = req.body;
    const { data, error} = await supabase.from('encomendas').insert([{ codigo, destinatario, bloco, apartamento, tipo, entregador_id}]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Encomenda cadastrada com sucesso', data });
}

export async function listar(req, res) {
    const { data, error } = await supabase.from('encomendas').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}