import { API } from './api.js';

document.getElementById('form-agendamentos').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        nome: document.getElementById('nome').value,
        documento: document.getElementById('documento').value,
        placa: document.getElementById('placa').value,
        tem_veiculo: document.getElementById('tem_veiculo').value === 'true',
        salao: parseInt(document.getElementById('salao').value),
        bloco: document.getElementById('bloco').value,
        apartamento: document.getElementById('apartamento').value,
        data_reserva: document.getElementById('data_reserva').value
    };


    const res = await fetch(`${API}/agendamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const json = await res.json();
    alert(json.message || 'Erro ao cadastrar convidado');
    e.target.reset();
});

const modal = document.getElementById("modal-busca");
const abrirModalBtn = document.getElementById("abrir-modal-busca");
const fecharModalBtn = document.querySelector(".fechar-modal");
const buscarBtn = document.getElementById("btn-buscar-placa");
const resultadoDiv = document.getElementById("resultado-busca");

abrirModalBtn.onclick = () => {
    modal.style.display = "block";
};

fecharModalBtn.onclick = () => {
    modal.style.display = "none";
    resultadoDiv.innerHTML = "";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        resultadoDiv.innerHTML = "";
    }
};

buscarBtn.onclick = async () => {
    const placa = document.getElementById('placa-busca').value.trim().toUpperCase();
    if (!placa) {
        resultadoDiv.innerHTML = "<p>⚠️ Digite a placa.</p>";
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/agendamentos/placa/${placa}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Erro ao buscar");

        resultadoDiv.innerHTML = `
        <p><strong>Nome do convidado:</strong> ${json.nome}</p>
        <p><strong>Bloco:</strong> ${json.bloco}</p>
        <p><strong>Apartamento:</strong> ${json.apartamento}</p>
        <p><strong>Salão:</strong> ${json.salao}</p>
        <p><strong>Data:</strong> ${json.data_reserva}</p>
        `;
    } catch (err) {
        resultadoDiv.innerHTML = `<p>style="color:red">❌ ${err.message}</p>`;
    }
};

router.get('/placa/:placa', async (req, res) => {
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
});
