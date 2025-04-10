# Portfólio | Lucas Fidelis

Bem-vindo ao repositório do meu portfólio! 🚀  
Este projeto foi desenvolvido com o objetivo de apresentar minhas habilidades, projetos e informações profissionais de forma clara, moderna e responsiva.
**[Repositório disponível em produção](https://portfolio-lucasfidelis.onrender.com)**

## 💻 Tecnologias Utilizadas

O projeto é desenvolvido com as tecnologias mais modernas do ecossistema frontend:

### **⚙️ Core**
- **[React 19](https://react.dev/):** Biblioteca para construção de interfaces declarativas e baseadas em componentes.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript com tipagem estática.
- **[Vite](https://vitejs.dev/):** Ferramenta de build extremamente rápida com suporte a HMR.

---

### **🎨 Estilização**
- **[Tailwind CSS 4](https://tailwindcss.com/):** Framework utilitário de CSS para criação de UIs modernas e responsivas.
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate):** Utilitário de animações com classes do Tailwind.
- **[clsx](https://github.com/lukeed/clsx):** Combinação condicional de classes.
- **[tailwind-merge](https://tailwind-merge.vercel.app/):** Resolve conflitos de classes utilitárias.

---

### **🧱 Componentes e UI**
- **[shadcn/ui](https://ui.shadcn.dev/):** Biblioteca de componentes baseada em Radix UI + Tailwind + variantes via `cva`.
- **[Radix UI](https://www.radix-ui.com/):** Componentes acessíveis e sem estilos base que serão utilizados como base para o shadcn:
  - Diálogo, Menubar, HoverCard, Popover, Separator, etc.
- **[MUI (Material UI)](https://mui.com/):** Utilizado para alguns ícones e componentes específicos.
  - `@mui/material`, `@mui/icons-material`
- **[Emotion](https://emotion.sh/docs/introduction):** CSS-in-JS usado junto ao MUI.

---

### **📦 Utilitários**
- **[axios](https://axios-http.com/):** Cliente HTTP para comunicação com APIs.

---

### **✅ Formulários e Validação**
- **[react-hook-form](https://react-hook-form.com/):** Gerenciamento de formulários de forma performática.
- **[Zod](https://zod.dev/):** Validação de dados com schema typing.
- **[@hookform/resolvers](https://react-hook-form.com/get-started#SchemaValidation):** Integração entre Zod e react-hook-form.

---

### **🔔 Notificações**
- **[react-toastify](https://fkhadra.github.io/react-toastify/):** Biblioteca para toasts e alertas personalizáveis.

---

### **🔧 Dev Tools**
- **[ESLint](https://eslint.org/):** Linting de código para garantir boas práticas.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react):** Suporte avançado para React + Vite.
- **[typescript-eslint](https://typescript-eslint.io/):** Linting específico para projetos TypeScript.

---

## 📁 Estrutura do Projeto
```
src/
├── assets/                 # Imagens e recursos estáticos
│   ├── catalogBackEnd/
│   ├── portfolio/
│   ├── positivus/
│   ├── testsCypress/
│   ├── toDoList/
│   ├── profile-1.jpg
│   └── undraw_profiles.svg
│
├── components/             # Componentes reutilizáveis
│   ├── sections/           # Seções da página (Sobre, Projetos, etc)
│   └── ui/                 # Componentes baseados no shadcn/ui
│
├── interfaces/             # Tipagens globais
│
├── lib/                    # Lógicas reutilizáveis e chamadas externas
│
├── utils/                  # Funções utilitárias (envio de email, busca de projetos, etc.)
│   └── lists/              # Listas de projetos, seções e habilidades
│
├── App.tsx                 # Componente principal da aplicação
├── main.tsx                # Ponto de entrada da aplicação
├── vite-env.d.ts           # Tipagem do Vite
└── index.css               # Estilos globais
```