const ALLOWED_ORIGINS = [
  'https://livre-blanc-yann-s.vercel.app',
  'https://michael-banger.github.io'
];

const PDF_DOWNLOAD_URL = 'https://livre-blanc-yann-s.vercel.app/assets/lb.pdf';
const SENDER = { email: 'yannsidbks@gmail.com', name: 'Livre Blanc D2C' };

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'method_not_allowed' });
    return;
  }

  const { email, firstName, lastName, company } = req.body || {};
  const emailValid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid || !firstName || !lastName || !company) {
    res.status(400).json({ success: false, error: 'invalid_fields' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ success: false, error: 'server_not_configured' });
    return;
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email, name: `${firstName} ${lastName}` }],
        subject: 'Votre livre blanc D2C 2026',
        htmlContent: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
            <h2>Merci ${firstName} !</h2>
            <p>Voici le lien pour télécharger votre guide :</p>
            <p><a href="${PDF_DOWNLOAD_URL}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;">Télécharger le PDF</a></p>
            <p style="color:#666;font-size:13px;">Si le bouton ne fonctionne pas, copiez ce lien : ${PDF_DOWNLOAD_URL}</p>
          </div>
        `
      })
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      res.status(502).json({ success: false, error: 'brevo_error', detail: errText });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
