import { API } from './api.js';

async function buscarTodos() {
    const nomeFiltro = document.getElementById('filtro').value.toLowerCase();

    // ENTREGADORES
    const resEnt = await fetch(`${API}/entregadores`);
    const entregadores = await resEnt.json();

    const listaEnt = document.getElementById('lista-entregadores');
    listaEnt.innerHTML = '';
    entregadores
    .filter(e => e.nome.toLowerCase().includes(nomeFiltro))
    .forEach(e => {
        const li = document.createElement('li');
        li.textContent = `📦 ${e.nome} - CPF: ${e.cpf || ''} - Telefone: ${e.rg || ''} - Placa: ${e.placa || ''} - ${e.empresa || ''})`;
        listaEnt.appendChild(li);
    });

    // ENCOMENDAS
    const resEnc = await fetch(`${API}/encomendas`);
    const encomendas = await resEnc.json();

    const listaEnc = document.getElementById('lista-encomendas');
    listaEnc.innerHTML = '';
    encomendas
    .filter(e => e.destinatario.toLowerCase().includes(nomeFiltro))
    .forEach(e => {
        const li = document.createElement('li');
        li.textContent = `📬 Código: ${e.codigo} | Para: ${e.destinatario} - Bloco ${e.bloco}/${e.apartamento}`;
        listaEnc.appendChild(li);
    });


     // CONVIDADOS
    for (let salao = 1; salao <= 4; salao++) {
        const resConv = await fetch(`${API}/agendamentos/${salao}`);
        const agendamentos = await resConv.json();

        const listaAgendamentos = document.getElementById('lista-agendamentos');
        agendamentos
        .filter(c => c.nome.toLowerCase().includes(nomeFiltro))
        .forEach(c => {
            const li = document.createElement('li');
            li.textContent = `🎉 ${c.nome} | Salão ${c.salao} - ${c.data_reserva} | Status: ${c.status_entrada}`;
            listaAgendamentos.appendChild(li);
        });
    }
}

window.buscarTodos = buscarTodos;