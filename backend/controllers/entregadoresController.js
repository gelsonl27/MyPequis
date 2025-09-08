import supabase from '../supabase/client.js';
import { randomUUID } from 'crypto';

export async function cadastrar(req, res) {
  try {
    // Agora funciona com multipart/form-data
    const nome    = req.body.nome?.trim();
    const cpf     = req.body.cpf?.trim();
    const rg      = req.body.rg?.trim();
    const placa   = req.body.placa?.trim();
    const empresa = req.body.empresa?.trim();

    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
    if (!cpf && !rg) {
      return res.status(400).json({ error: 'Informe CPF ou RG' });
    }

    let foto_url = null;
    if (req.file) {
      const fileExt = req.file.mimetype.split('/')[1];
      const fileName = `${randomUUID()}.${fileExt}`;

      const bucket = supabase.storage.from('entregadores');
      const { error: upErr } = await bucket.upload(
        `fotos/${fileName}`,
        req.file.buffer,
        { contentType: req.file.mimetype }
      );

      if (upErr) throw upErr;

      const { data: publicUrl } = bucket.getPublicUrl(`fotos/${fileName}`);
      foto_url = publicUrl.publicUrl;
    }

    const { data, error } = await supabase.from('entregadores').insert([{
      nome,
      cpf,
      rg,
      placa,
      empresa,
      foto_url
    }]).select().single();

    if (error) throw error;

    res.json({ message: 'Entregador cadastrado com sucesso', data });
  } catch (err) {
    console.error('ERRO /entregadores', err.message || err);
    res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

export async function listar(req, res) {
  try {
    const { data, error } = await supabase
      .from('entregadores')
      .select('*')
      .order('data_entrada', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('ERRO ao listar entregadores:', err.message || err);
    res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

