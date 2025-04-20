
import { useState } from 'react';

const calligraphyStyles = ['篆书', '楷书', '行书', '草书'];
const API_BASE = 'https://mycalli-backend.onrender.com';

export default function MyCalli() {
  const [englishName, setEnglishName] = useState('');
  const [chineseName, setChineseName] = useState('');
  const [style, setStyle] = useState(calligraphyStyles[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateName = async () => {
    const res = await fetch(`${API_BASE}/api/translate-name`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ englishName })
    });
    const data = await res.json();
    setChineseName(data.chineseName);
  };

  const handleGenerateCalligraphy = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/generate-calligraphy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: chineseName, style })
    });
    const data = await res.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center' }}>MyCalli · AI 书法生成器</h1>
      <input
        type="text"
        placeholder="输入英文名 (如 David)"
        value={englishName}
        onChange={(e) => setEnglishName(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
      />
      <button onClick={handleGenerateName} style={{ marginTop: '1rem' }}>生成中文名</button>

      {chineseName && (
        <div style={{ marginTop: '1rem' }}>
          <p>中文名：<strong>{chineseName}</strong></p>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            {calligraphyStyles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button onClick={handleGenerateCalligraphy} style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? '生成中…' : '生成书法图像'}
          </button>
        </div>
      )}

      {imageUrl && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <img src={imageUrl} alt="书法艺术字" style={{ maxWidth: '100%' }} />
          <a href={imageUrl} download={`MyCalli_${chineseName}_${style}.png`} style={{ display: 'block', marginTop: '0.5rem', color: 'blue' }}>下载图片</a>
        </div>
      )}
    </div>
  );
}
