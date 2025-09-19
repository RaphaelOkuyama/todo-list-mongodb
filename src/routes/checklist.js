import { Router } from 'express';
import Checklist from '../models/checklist.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find({});
    res.render('checklists/index', { checklists: checklists});
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas de Tarefas', title: 'Erro' });
  }
});

router.get('/new', async (req,res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render('checklists/new', {checklist: checklist});
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário', title: 'Erro' });
  }
})

router.get('/:id/edit', async (req,res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/edit', {checklist: checklist});
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir a edição de listas de tarefas' });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const checklist = await Checklist.findById(id).populate('tasks');

    if (!checklist) {
      return res.status(404).render('pages/error', { error: 'Checklist não encontrada', title: 'Erro' });
    }
    res.render('checklists/show', { checklist: checklist });
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao criar checklist', title: 'Erro' });
  }
});

router.post('/', async (req, res) => {
    const { name } = req.body.checklist;
    let checklist = { name: name };

    try {
        await Checklist.create({ name });
        res.redirect('/checklists');
    } catch (error) {
        if (error.name === 'ValidationError') {
            checklist.error = error.errors;
            res.status(422).render('checklists/new', { checklist: checklist });
        } else {
            res.status(500).render('pages/error', { error: 'Erro ao criar a Lista de Tarefas' });
        }
    }
});

router.put('/:id', async (req, res) => {
  const { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id)

  try {
    await checklist.updateOne({name});
    res.redirect('/checklists');
  } catch (error) {
    let errors = error.errors;
    res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Checklist.findByIdAndDelete(id);
    res.redirect('/checklists')
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao Deletar a Lista de Tarefas' });
  }
});


export default router;