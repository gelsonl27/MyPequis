import { API } from './api.js';

const form = document.getElementById('form-controle');
const enderecosContainer = document.getElementById('enderecos-container');
const btnAddEndereco = document.getElementById('add-endereco');
const selectEntregador = document.getElementById('entregador');

// ➕ Adicionar mais campos de endereço
btnAddEndereco.addEventListener('click', () =>{
    const novoCampo = document.createElement('div');
    novoCampo.classList.add('campo');
    novoCampo.innerHTML = `
    <label>endereço de Entrega</label>
    <input type="text" name="enderecos[]" placeholder="Rua, número, complemento..." required />
    `;
    enderecosContainer.appendChild(novoCampo);
});

// 🔽 Preenche dropdown de entregadores
async function carregarEntregadores() {
    const res = await fetch(`${API}/entregadores`);
    const entregadores = await res.json();

    entregadores.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.id;
        opt.textContent = e.nome;
        selectEntregador.appendChild(opt);
    });
}
carregarEntregadores();

// ✅ Enviar dados
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const enderecos = [...document.querySelectorAll('input[name="enderecos[]"]')]
    .map(input => input.value.trim())
    .filter(v => v !== '');

  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const entregador_id = document.getElementById('entregador').value;

  const body = {
    enderecos,
    data,
    hora,
    entregador_id
  };

  try {
    const res = await fetch(`${API}/controle-encomendas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const json = await res.json();
    alert(json.message || 'Cadastro realizado com sucesso');
    
    form.reset();
    enderecosContainer.innerHTML = `
      <div class="campo">
        <label>Endereço de Entrega</label>
        <input type="text" name="enderecos[]" placeholder="Rua, número, complemento..." required />
      </div>
    `;
  } catch (err) {
    console.error('❌ Erro ao enviar formulário:', err.message);
    alert('Erro ao cadastrar. Verifique os dados.');
  }
});

document.getElementById('btn-buscar-data').addEventListener('click', async () => {
  const data = document.getElementById('data-busca').value;
  if (!data) return alert('Informe uma data!');

  try {
    const res = await fetch(`${API}/controle-encomendas/data/${data}`);
    const resultados = await res.json();

    const modal = document.getElementById('modal-data');
    const container = document.getElementById('resultados');
    const fechar = document.getElementById('fechar-modal');

    if (res.ok && resultados.length > 0) {
      container.innerHTML = resultados.map(e => `
        <div class="resultado-item">
        <p><strong>Endereço:</strong> ${e.endereco}</p>
        <p><strong>Data:</strong> ${e.data_entrega}</p>
        <p><strong>Hora:</strong> ${e.hora_entrega}</p>
        <p>Entregador: ${e.nome_entregador || 'Não informado'}</p>
        <hr>
        </div>
        `).join('');
    } else {
      container.innerHTML = '<p>Nenhuma encomenda encontrada para essa data.</p>';
    }

    modal.classList.remove('hidden');
    fechar.onclick = () => modal.classList.add('hidden');
  } catch (err) {
    alert('Erro ao buscar encomendas');
    console.error(err);
  }
});