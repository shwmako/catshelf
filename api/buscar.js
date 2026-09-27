export default async function handler(req, res) {
  // Permitimos consultas desde cualquier origen (evita CORS en Vercel)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { titulo } = req.query;

  if (!titulo) {
    return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });
  }

  try {
    const targetUrl = `https://mangadex.org{encodeURIComponent(titulo)}&limit=20&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&order[relevance]=desc`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'ManhwaTrackerApp/1.0'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al conectar con MangaDex' });
  }
}