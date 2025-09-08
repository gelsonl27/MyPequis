import { API } from './api.js';

document.addEventListener('DOMContentLoaded', carregarEntregadores);
document.getElementById('form-encomenda').addEventListener('submit', cadastrarEncomenda);

async function carregarEntregadores() {
  try {
    const res = await fetch(`${API}/entregadores`);
    const entregadores = await res.json();
    console.log('Entregadores fetched:', entregadores);

    const select = document.getElementById('entregador_id');
    if (Array.isArray(entregadores)) {
      entregadores.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = `${e.nome} (${e.empresa || 'sem empresa'})`;
        // Removed duplicated line below
        // option.textContent = `${e.nome} (${e.placa || 'sem placa'})`;
        select.appendChild(option);
      });
    } else {
      console.error('Entregadores is not an array:', entregadores);
      alert('Erro: dados de entregadores inválidos recebidos do servidor.');
    }
  } catch (err) {
    console.error('Erro ao carregar entregadores:', err);
    alert('Erro ao carregar lista de entregadores.');
  }
}

async function cadastrarEncomenda(e) {
  e.preventDefault();

  const codigo = document.getElementById('codigo');
  const destinatario = document.getElementById('destinatario');
  const bloco = document.getElementById('bloco');
  const apartamento = document.getElementById('apartamento');
  const tipo = document.getElementById('tipo');
  const entregador_id = document.getElementById('entregador_id');

  const body = {
    codigo: codigo.value,
    destinatario: destinatario.value,
    bloco: bloco.value,
    apartamento: apartamento.value,
    tipo: tipo.value,
    entregador_id: entregador_id.value
  };

  try {
    const res = await fetch(`${API}/encomendas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || 'Erro ao cadastrar encomenda');
    }

    alert('Encomenda cadastrada com sucesso!');
    e.target.reset();
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    alert(err.message);
  }
}

 