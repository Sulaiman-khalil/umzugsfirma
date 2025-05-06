import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express(); // Hier setzen wir die richtige Typisierung für `app`

app.use(cors());
app.use(bodyParser.json());

app.post("/kontakt", (req, res) => {
  const { name, message } = req.body;
  console.log(`Neue Nachricht von ${name}: ${message}`);

  res.json({ success: true, message: "Danke für deine Nachricht!" });
});

app.listen(5000, () => console.log("Backend läuft auf http://localhost:5000"));
