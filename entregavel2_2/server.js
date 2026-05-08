/*import express from "express";
import cors from "cors";
import {linkedList} from "./linked-list.js";


const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());

const lista = new linkedList();

app.post('/push', (req, res) => {

    const json = req.body;
    lista.push(json.value);
    res.status(201).json({ success : true });

});


app.get('/list', (req, res) =>{

    const lista_array = lista.toArray();

    res.json(lista_array);
    
})



app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);

*/



import express from "express";
import cors from "cors";
import { linkedList } from "./linked-list.js";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const lista = new linkedList();

app.post('/push', (req, res) => {
  const { value } = req.body;
  if (value === undefined) return res.status(400).json({ error: "value é obrigatório" });
  lista.push(value);
  res.status(201).json({ success: true });
});

app.get('/peek', (req, res) => {
  const value = lista.peek();
  if (value === undefined) return res.status(404).json({ error: "Lista vazia" });
  res.json({ value });
});

app.delete('/pop', (req, res) => {
  if (lista.size === 0) return res.status(404).json({ error: "Lista vazia" });
  if (lista.size === 1) {
    lista.head = null;
    lista.size--;
    return res.json({ success: true });
  }
  lista.pop();
  res.json({ success: true });
});

app.get('/list', (req, res) => {
  res.json(lista.toArray());
});

app.get('/get/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const result = lista.getAt(index);
  if (typeof result === "string") return res.status(404).json({ error: result });
  res.json({ value: result });
});

app.delete('/remove/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const result = lista.removeAt(index);
  if (typeof result === "string") return res.status(404).json({ error: result });
  res.json({ success: true });
});

app.post('/insert', (req, res) => {
  const { value, index } = req.body;
  if (value === undefined || index === undefined)
    return res.status(400).json({ error: "value e index são obrigatórios" });
  lista.insertAt(value, index);
  res.status(201).json({ success: true });
});

app.patch('/reverse', (req, res) => {
  if (lista.size === 0) return res.status(404).json({ error: "Lista vazia" });
  lista.reverse();
  res.json({ success: true, list: lista.toArray() });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);