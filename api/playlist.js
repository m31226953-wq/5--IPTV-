const M3U8_URL = 'https://raw.githubusercontent.com/m31226953-wq/5--IPTV-/refs/heads/main/5%D0%91%D0%98%D0%A2%D0%9E%D0%92.m3u8';

const BROWSERS = [
  'Chrome', 'Firefox', 'Safari', 'Edg', 'Edge',
  'Opera', 'Brave', 'YaBrowser', 'Mozilla'
];

export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';

  const isBrowser = BROWSERS.some(browser => userAgent.includes(browser));
  
  if (isBrowser) {
    res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>Доступ запрещён</title></head>
      <body style="background:#0a0e27;color:white;font-family:system-ui;text-align:center;padding:50px;">
        <h1>⛔ Доступ запрещён</h1>
        <p>Эта ссылка работает только в IPTV-плеерах:</p>
        <p><b>VLC • SS IPTV • IPTV Smarters • TiviMate</b></p>
        <p>Откройте ссылку в одном из этих приложений.</p>
      </body>
      </html>
    `);
    return;
  }
  
  const response = await fetch(M3U8_URL);
  const content = await response.text();
  
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  res.status(200).send(content);
}
