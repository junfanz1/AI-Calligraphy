
# MyCalli · AI书法生成器

🎨 输入英文名，一键生成中文艺术字（支持篆书、楷书、行书、草书等风格），体验 AI 书法之美。

---

## 🧱 项目结构

- `frontend/`：基于 React + Tailwind 构建的网页前端
- `backend/`：Flask 实现的后端接口，支持中文名翻译与书法图像生成
- `fonts/`：请放置书法字体文件，例如：
  - 楷书.ttf
  - 行书.ttf
  - 草书.ttf
  - 篆书.ttf

---

## 🚀 本地运行

### 启动后端

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

### Vite 代理配置（开发调试）

确保 `vite.config.ts` 中包含代理配置：

```ts
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

---

## ☁️ 部署建议

- 前端部署至：Vercel / Netlify
- 后端部署至：Render / HuggingFace Space / Railway
- 字体建议使用开源字体并确保版权合规
