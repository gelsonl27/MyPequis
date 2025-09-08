import { API } from './api.js';

document.getElementById('form-entregador').addEventListener('submit', cadastrarEntregador);

async function cadastrarEntregador(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', document.getElementById('nome').value);
    formData.append('cpf', document.getElementById('cpf').value);
    formData.append('rg', document.getElementById('rg').value);
    formData.append('placa', document.getElementById('placa').value);
    formData.append('empresa', document.getElementById('empresa').value);

    const fotofile = document.getElementById('foto').files[0];
    if (fotofile) formData.append('foto', fotofile);

    try {
        const res = await fetch(`${API}/entregadores`, {
            method: 'POST',
            body: formData
        });
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || 'Falha');

        alert('Entregador cadastrado!');
        e.target.reset();
    } catch (err) {
        alert(`Erro: ${err.message}`);
        console.error(err);
    }
}