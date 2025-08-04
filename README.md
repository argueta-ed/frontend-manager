# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# ⚙️ Project installation
Follow these steps to prepare the development environment:

## Clone the repository
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

Make sure to install dependencies using npm:

```bash
npm install
```
## API Connection Configuration
To connect to the API, define the BASE_URL environment variable in a .env file at the root of your project.

By default, the code is configured as follows:

```bash
BASE_URL=http://localhost:8000
```
Si tu API está en otra URL, cambia esta variable para que las llamadas a la API funcionen correctamente.

## Development Server
Start the development server on http://localhost:3000:
```bash
npm run dev
```

## Production
Build the application for production:
```bash
npm run build
```
Locally preview production build:
```bash
npm run preview
```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.