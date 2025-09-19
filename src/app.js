import express from 'express';
import path from 'path';
import connectDB from '../config/database.js'; 
import checklistRouter from './routes/checklist.js';
import rootRouter from './routes/index.js';
import taskRouter from './routes/task.js';
import methodOverride from 'method-override';


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));


app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'src/views')); 
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checklistRouter);
app.use('/checklists', taskRouter); 
app.use('/tasks', taskRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});