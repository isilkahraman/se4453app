const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const KEYVAULT_URL = 'https://vault-midterm.vault.azure.net/';

async function getSecrets() {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(KEYVAULT_URL, credential);

  const username = await client.getSecret('db-username');
  const password = await client.getSecret('db-password');
  const host = await client.getSecret('db-host');
  const dbName = await client.getSecret('db-name');

  return {
    username: username.value,
    password: password.value,
    host: host.value,
    dbName: dbName.value,
  };
}

module.exports = getSecrets;

