// api/playlist.js
export default async function handler(req, res) {
  const GITHUB_URL = 'https://raw.githubusercontent.com/m31226953-wq/5--IPTV-/refs/heads/main/5%D0%91%D0%98%D0%A2%D0%9E%D0%92.m3u8';
  
  try {
    const response = await fetch(GITHUB_URL);
    let content = await response.text();
    content = content.replace(/#EXTINF:/g, '#EXTINF:');
    
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send('Ошибка загрузки плейлиста');
  }
}
