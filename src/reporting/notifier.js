// Simple reporting module; can send to webhook if configured
const axios = require('axios');

async function notify({message, webhookUrl}) {
  if (!webhookUrl) {
    console.log('[notify]', message);
    return {sent: false};
  }
  try {
    await axios.post(webhookUrl, {text: message});
    return {sent: true};
  } catch (err) {
    console.error('notify error', err.message);
    return {sent: false, error: err.message};
  }
}

module.exports = {notify};