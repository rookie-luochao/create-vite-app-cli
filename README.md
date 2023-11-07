# create-vite-app-cli
a fast create webapp template cli, perfect engineering development experience, currently supported template presets include:
- `react-ts` (React + TypeScript + Vite + Pnpm + Zustand + Openapi + Docker)
- `vue-ts` (Vue 3 + TypeScript + Vite + Pnpm + Pinia + Openapi + Docker)

## Quick Start

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org/en/) version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With Run:

```bash
# npm
$ npm create vite-app-cli@latest

# pnpm
$ pnpm create vite-app-cli@latest
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + React project, run:

```bash
# npm
npm create vite-app-cli@latest my-react-app --template react-ts

# pnpm
pnpm create vite-app-cli@latest my-react-app --template react-ts
```

template presets detail:

- `react-ts` [点此去](https://github.com/rookie-luochao/create-vite-app-cli/tree/master/template-react-ts)
- `vue-ts` [点此去](https://github.com/rookie-luochao/create-vite-app-cli/tree/master/template-vue-ts)