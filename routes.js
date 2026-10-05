import express from "express";
const router = express.Router();

router.get("/", (_, res) => {
  res.send("Homepage");
});

router.get("/about", (_, res) => {
  res.send("About page");
});

// Route 1: Menangani permintaan tanpa parameter nama
router.get("/hello", (req, res) => {
  const { lang } = req.query;
  if (lang === "id") {
    return res.send("Hai, stranger!");
  }
  res.send("Hello, stranger!");
});
// Route 2: Menangani permintaan dengan parameter nama
router.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  const { lang } = req.query;
  if (lang === "id") {
    return res.send(`Hai, ${name}!`);
  }
  res.send(`Hello, ${name}!`);
});

router.all("/", (_, res) => {
  res.status(405).send("Halaman tidak dapat diakses dengan method tersebut");
});

router.all("/about", (_, res) => {
  res.status(405).send("Halaman tidak dapat diakses dengan method tersebut");
});

router.use((_, res) => {
  res.send("Halaman tidak ditemukan");
});

export default router;
