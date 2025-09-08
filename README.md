# 🏢 Sistema de Gestão Condominial
### Aplicativo web/mobile para controle de acessos temporários em condomínios, com foco na gestão de entregadores, encomendas e convidados para eventos.

## 📱 Objetivo do Aplicativo
* Criar uma plataforma acessível e mobile-friendly para:

* Cadastrar entregadores e encomendas de forma organizada.

* Gerenciar reservas dos salões de festa e controle de entrada de convidados.

* Oferecer segurança e praticidade para porteiros, síndicos e moradores.

## 🔐 Requisitos Gerais
* Backend: Node.js + Express

* Banco de Dados: Supabase 

* Frontend: HTML, CSS, JavaScript 

* Funcionalidades Gerais:

* Painel Admin (porteiro/síndico)

* Interface mobile-friendly

* Autenticação via senha (admin)

## 📦 Módulo 1: Cadastro de Entregadores e Encomendas
## 📌 Funcionalidades:
### 1.1. Cadastro de Entregador:

* Nome completo

* CPF (opcional)

* RG (opcional)

* Empresa (Ex: Correios, Mercado Livre, etc.)

* Foto (opcional)

* Veículo: Tipo / Placa (opcional)

* Data e hora de entrada (automático)

* Data e hora de saída (preenchido posteriormente)

### 1.2. Cadastro da Encomenda:

* Código da encomenda (etiqueta)

* Destinatário (nome do morador)

* Bloco e apartamento

* Tipo: 📦 Pequeno, 📬 Médio, 📦 Grande

* Foto (opcional)

* Status: Aguardando retirada, Retirada, Em entrega

## 🎉 Módulo 2: Cadastro de Convidados para Salões de Festa
## 📌 Regras de Negócio:

* O condomínio possui 4 salões: Salão 1, Salão 2, Salão 3, Salão 4

* Cada salão pode ser reservado por apenas um morador por data

* Os convidados devem estar vinculados a uma reserva

* Porteiros poderão consultar nomes dos convidados por dia

## 📋 Funcionalidades:
### 2.1. Cadastro de Reserva de Salão:

* Morador (nome)

* Bloco e apartamento

* Salão (1 a 4)

* Data e horário da festa

* Observações (opcional)

### 2.2. Cadastro de Convidados:

* Nome completo

* Documento (CPF ou RG – opcional)

* Está com veículo? (Sim/Não)

* Se sim: placa (opcional)

* Salão associado

* Data de entrada

## 📂 Tecnologias Utilizadas

* Node.js

* Express.js

* Supabase

* HTML / CSS / JavaScript

## 👨‍💻 Desenvolvedor

Este projeto está em desenvolvimento. Sinta-se à vontade para contribuir ou sugerir melhorias!



