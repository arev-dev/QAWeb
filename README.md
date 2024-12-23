# Proyecto Frontend QAnswers

## 📋 Descripción
Este proyecto es una aplicación web construida con React, utilizando Vite como bundler y Tailwind CSS para los estilos.

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16.0 o superior)
- npm o yarn

### Pasos para instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/nombre-proyecto.git
cd nombre-proyecto
```

2. Instala las dependencias:
```bash
npm install
# o si usas yarn
yarn
```

3. Instala y configura Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configura Tailwind CSS. Actualiza el archivo `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Agrega las directivas de Tailwind en tu archivo CSS principal (`src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 💻 Desarrollo

Para ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
# o con yarn
yarn dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173`

## 🏗️ Construcción

Para construir el proyecto para producción:
```bash
npm run build
# o con yarn
yarn build
```

## 📝 Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la construcción de producción localmente

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles
