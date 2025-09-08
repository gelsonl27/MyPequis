import { API } from './api.js';

const form = document.getElementById('form-acesso');
const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const fotoPreview = document.getElementById('foto-capturada');
let foto_base64 = null;

// Iniciar câmera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error('Erro ao acessar webcam:', err);
    });

// Capturar imagem
document.getElementById('capturar').addEventListener('click', () => {
    if (!video.videoWidth || !video.videoHeight) {
        alert('Aguarde a câmera carregar totalmente antes de capturar')
    }


    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    foto_base64 = canvas.toDataURL('image/png');
    fotoPreview.src = foto_base64;
    document.getElementById('foto-capturada').src = foto_base64;
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        nome: document.getElementById('nome').value,
        documento: document.getElementById('documento').value,
        placa: document.getElementById('placa').value,
        bloco: document.getElementById('bloco').value,
        unidade: document.getElementById('unidade').value,
        tipo: document.getElementById('tipo').value,
        liberado_por: document.getElementById('liberado_por').value,
        liberacao_permanente: document.getElementById('liberacao_permanente').checked,
        data_fim: document.getElementById('data_fim').value || null,
        foto_base64
    };

    try {
        const res = await fetch(`${API}/acessos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Erro ao salvar');

        alert('✅ Acesso cadastrado com sucesso!');
        form.reset();
        document.getElementById('foto-capturada').src = '';
    } catch (err) {
        alert(`❌ Erro: ${err.message}`);
        console.error(err); 
    }
});

document.getElementById('btn-consulta').addEventListener('click', async () => {
    const doc = document.getElementById('consulta-doc').value.trim();
    if (!doc) return alert('Informe o CPF ou RG');

    const res = await fetch(`${API}/acessos/${doc}`);
    const data = await res.json();

    const modal = document.getElementById('modal');
    const modalInfo = document.getElementById('modal-info');
    const fechar = document.getElementById('fechar');

    if (data && data.length) {
        const acesso = data[0];

        modalInfo.innerHTML = `
        <p><strong>${acesso.nome}</strong> - ${acesso.tipo}</p>
        <p>Destino: Bloco ${acesso.bloco}, Unidade ${acesso.unidade}</p>
        <p>Liberado por: ${acesso.liberado_por}</p>
        <p>Validade: ${acesso.liberacao_permanente ? 'Permanente'  : (acesso.data_fim || 'Não informado')}</p>

        <hr>
    `;

        // Exibir imagem no modal
        const modalFoto = document.getElementById('modal-foto');
        if (acesso.foto_url) {
            modalFoto.src = acesso.foto_url;
            modalFoto.style.display = 'block';
        } else {
            modalFoto.style.display = 'none';
        }

    } else {
        modalInfo.innerHTML = `<p>Nenhum acesso encontrado</p>`;
        document.getElementById('modal-foto').style.display = 'none';
    }


    modal.classList.remove('hidden');

    fechar.onclick = () => modal.classList.add('hidden');

});
