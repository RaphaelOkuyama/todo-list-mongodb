import { Router } from 'express';
import Checklist from '../models/checklist.js';
import Task from '../models/task.js';

const taskRouter = Router();

taskRouter.get('/:id/tasks/new', async (req, res) => {
  try {
    let task = new Task();
    res.status(200).render('tasks/new', { checklistId: req.params.id, task: task });
  } catch (error) {
    res.status(422).render('pages/error', { error: 'Erro ao carregar o formulário de tarefa' });
  }
});

taskRouter.post('/:id/tasks', async (req, res) => {
  let { name } = req.body.task;

  let task = new Task({ name, checklist: req.params.id });

  try {
    await task.save();

    let checklist = await Checklist.findById(req.params.id);

    checklist.tasks.push(task);

    await checklist.save();

    res.redirect(`/checklists/${req.params.id}`);
  } catch (error) {
    let errors = error.errors;
    res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id });
  }
});

taskRouter.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).render('pages/error', { error: 'Tarefa não encontrada' });
        }
        
        await Checklist.updateOne(
            { _id: task.checklist },
            { $pull: { tasks: task._id } }
        );
        
        res.redirect(`/checklists/${task.checklist}`);

    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao remover a tarefa' });
    }
});

taskRouter.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { done: req.body.done }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

export default taskRouter;