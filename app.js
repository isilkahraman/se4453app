const express = require('express');
const getSecrets = require('./vault');
const { createClient } = require('./db');

const app = express();

app.get('/hello', async (req, res) => {
  try {
    const secrets = await getSecrets(); // Vault'tan bilgileri al
    const client = createClient(secrets); // pg.Client nesnesi oluştur
    await client.connect();

    const result = await client.query('SELECT NOW()');
    await client.end();

    res.send(`Hello! DB Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).send('Error connecting to DB');
  }
});

// Yeni endpoint (trunk-based örneği için)
app.get('/version', (req, res) => {
  res.send('Version 1.0.1 - Feature branch denemesi');
});
//yeni status endpoint (trunk-based/branch2)
app.get('/status', (req, res) => {
  res.send({
    status: 'OK',
    message: 'Application is running smoothly!',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
