import express from 'express';
import multer from 'multer';
import * as Entregadores from '../controllers/entregadoresController.js';
import * as Encomendas from '../controllers/encomendasController.js';
import * as Agendamentos from '../controllers/agendamentosController.js';
import * as ControleEncomendas from '../controllers/controle-encomendasController.js';
import * as Acessos from '../controllers/acessosController.js';


const router = express.Router();
const upload = multer();   // armazena em memória


//Entregadores
// Entregadores
router.get('/entregadores', Entregadores.listar);
router.post('/entregadores', upload.single('foto'), Entregadores.cadastrar); // ✅ somente esta




//Encomendas
router.post('/encomendas', Encomendas.cadastrar);
router.get('/encomendas', Encomendas.listar);

//Convidados
//Convidados
router.get('/agendamentos/placa/:placa', Agendamentos.buscarPorPlaca); // ← Esta vem antes!
router.get('/agendamentos/:salaoNum', Agendamentos.listarPorSalao);    // ← Esta vem depois
router.post('/agendamentos', Agendamentos.cadastrar);



//Controle de Encomendas
router.get('/controle-encomendas/data/:data', ControleEncomendas.buscarPorData);
router.get('/controle-entregas', ControleEncomendas.listar);

router.post('/controle-encomendas', ControleEncomendas.cadastrar);


//Acessos
router.get('/acessos/:doc', Acessos.buscarPorDocumento);
router.post('/acessos', Acessos.cadastrar);




export default router;