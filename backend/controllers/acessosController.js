import supabase from '../supabase/client.js';
import { randomUUID } from 'crypto';

export async function cadastrar(req, res) {
    try {
        const {
            nome, documento, placa, bloco, unidade, tipo, liberado_por, liberacao_permanente, data_fim, foto_base64
        } = req.body;

        if (!nome || !documento || !bloco || !unidade || !tipo || !liberado_por) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando' });
        }

        let foto_url = null;
        if (foto_base64) {
            const base64Data = foto_base64.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const fileName = `${randomUUID()}.png`;

            const bucket = supabase.storage.from('acessos');
            const { error: uploadError } = await bucket.upload(
                `fotos/${fileName}`,
                buffer,
                { contentType: 'image/png' }
            );

            if (uploadError) throw uploadError;

            const { data: publicUrl } = bucket.getPublicUrl(`fotos/${fileName}`);
            foto_url = publicUrl.publicUrl;
        }

        const { data, error } = await supabase.from('acessos').insert([{
            nome,
            documento,
            placa,
            bloco,
            unidade,
            tipo,
            liberado_por,
            liberacao_permanente,
            data_fim: liberacao_permanente ? null : data_fim,
            foto_url
        }]);

        if (error) throw error;
        res.json({ message: 'Acesso cadastrado com sucesso', data });
    } catch (err) {
        console.error('❌ ERRO /acessos:', err.message);
        res.status(500).json({ error: err.message });
    }
}

export async function buscarPorDocumento(req, res) {
    const { doc } = req.params;

    console.log('🔍 Buscando acesso com documento:', doc);

    const { data, error } = await supabase
        .from('acessos')
        .select('*')
        .ilike('documento', `%${doc}%`);

    if (error) {
        console.error('❌ ERRO ao buscar por documento:', error.message);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);

}


