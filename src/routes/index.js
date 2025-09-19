import { Router } from 'express';
import Checklist from '../models/checklist.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find({});
    res.status(200).render('pages/index', { checklists: checklists });
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas' });
  }
});

export default router;