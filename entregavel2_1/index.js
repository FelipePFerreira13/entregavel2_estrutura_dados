const express = require("express");
const app = express();

const personagensNaruto = [
  { nome: "Naruto", sobrenome: "Uzumaki", idade: 17, chakra: 100, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Genin" },
  { nome: "Sasuke", sobrenome: "Uchiha", idade: 17, chakra: 85, ehDaFolha: false, possuiKekkeiGenkai: true, nivel: "Ninja Renegado" },
  { nome: "Sakura", sobrenome: "Haruno", idade: 17, chakra: 40, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Kakashi", sobrenome: "Hatake", idade: 31, chakra: 50, ehDaFolha: true, possuiKekkeiGenkai: true, nivel: "Jonin" },
  { nome: "Gaara", sobrenome: null, idade: 17, chakra: 90, ehDaFolha: false, possuiKekkeiGenkai: true, nivel: "Kazekage" },
  { nome: "Rock", sobrenome: "Lee", idade: 18, chakra: 20, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Hinata", sobrenome: "Hyuga", idade: 16, chakra: 45, ehDaFolha: true, possuiKekkeiGenkai: true, nivel: "Chunin" },
  { nome: "Shikamaru", sobrenome: "Nara", idade: 17, chakra: 35, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Tsunade", sobrenome: null, idade: 55, chakra: 95, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Hokage" },
  { nome: "Jiraiya", sobrenome: null, idade: 54, chakra: 88, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Sannin" },
  { nome: "Orochimaru", sobrenome: null, idade: 54, chakra: 92, ehDaFolha: false, possuiKekkeiGenkai: false, nivel: "Sannin" },
  { nome: "Itachi", sobrenome: "Uchiha", idade: 21, chakra: 60, ehDaFolha: false, possuiKekkeiGenkai: true, nivel: "Ninja Renegado" },
  { nome: "Neji", sobrenome: "Hyuga", idade: 18, chakra: 55, ehDaFolha: true, possuiKekkeiGenkai: true, nivel: "Jonin" },
  { nome: "Tenten", sobrenome: null, idade: 18, chakra: 30, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Ino", sobrenome: "Yamanaka", idade: 17, chakra: 40, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Choji", sobrenome: "Akimichi", idade: 17, chakra: 75, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Kiba", sobrenome: "Inuzuka", idade: 17, chakra: 45, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Shino", sobrenome: "Aburame", idade: 17, chakra: 65, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Chunin" },
  { nome: "Sai", sobrenome: null, idade: 17, chakra: 50, ehDaFolha: true, possuiKekkeiGenkai: false, nivel: "Anbu" },
  { nome: "Temari", sobrenome: null, idade: 20, chakra: 70, ehDaFolha: false, possuiKekkeiGenkai: false, nivel: "Jonin" },
];

app.get("/nomes", (req, res) =>
  res.json(personagensNaruto.map(p => p.sobrenome ? `${p.nome} ${p.sobrenome}` : p.nome))
);

app.get("/folha-menores", (req, res) =>
  res.json(personagensNaruto.filter(p => p.ehDaFolha && p.idade < 18))
);

app.get("/kekkei-genkai", (req, res) =>
  res.json({ quantidade: personagensNaruto.filter(p => p.possuiKekkeiGenkai).length })
);

app.get("/chakras-jonin", (req, res) =>
  res.json(personagensNaruto.filter(p => p.nivel === "Jonin").map(p => p.chakra))
);


app.get("/chakra-stats", (req, res) =>
  res.json({
    total: personagensNaruto.reduce((acc, p) => acc + p.chakra, 0),
    media: personagensNaruto.reduce((acc, p) => acc + p.chakra, 0) / personagensNaruto.length,
    menorChakra: personagensNaruto.reduce((a, b) => a.chakra < b.chakra ? a : b, personagensNaruto[0]),
    maiorChakra: personagensNaruto.reduce((a, b) => a.chakra > b.chakra ? a : b, personagensNaruto[0]),
  })
);

app.get("/chunin-razao-media", (req, res) =>
  res.json({
    mediaRazaoChakraIdade:
      personagensNaruto
        .filter(p => p.nivel === "Chunin")
        .map(p => p.chakra / p.idade)
        .reduce((acc, r, _, arr) => acc + r / arr.length, 0)
  })
);


app.get("/razao-extremos", (req, res) =>
  res.json({
    maiorRazao: personagensNaruto.map(p => ({ nome: p.nome, razao: p.chakra / p.idade })).reduce((a, b) => a.razao > b.razao ? a : b),
    menorRazao: personagensNaruto.map(p => ({ nome: p.nome, razao: p.chakra / p.idade })).reduce((a, b) => a.razao < b.razao ? a : b),
  })
);

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));