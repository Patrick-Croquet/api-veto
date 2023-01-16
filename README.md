symfony new api

cd api

symfony serve -d

composer require api

composer require maker --dev

php bin/console make:entity

php bin/console doctrine:database:create

php bin/console make:migration
php bin/console doctrine:migrations:migrate

php bin/console debug:router
https://127.0.0.1:8000/api/proprietaires/1.json

composer require profiler --dev
https://127.0.0.1:8000/_profiler

php bin/console debug:config api_platform

Vue.js Generator
npm init vue@latest -- --typescript --router --pinia --eslint-with-prettier my-app
cd my-app

npm install dayjs lodash @types/lodash

npm init @api-platform/client http://127.0.0.1:8001/api/proprietaires src/ -- --generator vue --resource proprietaire

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Replace the content of tailwind.config.js by:

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

Replace the content of src/assets/main.css by:

@tailwind base;
@tailwind components;
@tailwind utilities;

npm run serve

Paste the following definitions in your application configuration:

//import routes
import proprietaireRoutes from './router/proprietaire'

// Add routes to VueRouter
const router = new VueRouter({
  // ...
  routes: [
      ...proprietaireRoutes,
  ]
});

// Add the modules in the store
import proprietaire from './store/modules/proprietaire/';

export const store = new Vuex.Store({
  // ...
  modules: {
    proprietaire
  }
});