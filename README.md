# Metabase Proxy - Fullkom

Proxy minimalista para resolver CORS entre el dashboard y bi.starkoms.com.

## Deploy en Railway (recomendado)

1. Ve a https://railway.app y crea una cuenta gratuita
2. Haz clic en "New Project" → "Deploy from GitHub repo"
   - O usa "Deploy from template" → "Empty project"
3. Sube estos archivos o conecta tu GitHub
4. En Variables, agrega:
   - METABASE_URL = https://bi.starkoms.com
5. Railway te dará una URL pública tipo:
   - https://metabase-proxy-xxxx.railway.app

## Deploy en Render (alternativa gratuita)

1. Ve a https://render.com
2. New → Web Service → conecta GitHub o sube los archivos
3. Build Command: npm install
4. Start Command: node server.js
5. Agrega variable: METABASE_URL = https://bi.starkoms.com

## Uso

Una vez desplegado, el dashboard apunta a tu proxy en vez de a Metabase directamente.
