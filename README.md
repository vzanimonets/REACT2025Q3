# Star Wars Characters Search (React + TypeScript + Vite)

This project is a React application built with TypeScript and Vite. It allows users to search for Star Wars characters using the [SWAPI](https://swapi.py4e.com/api/people/) API. The app demonstrates modern React development practices, including class components, error boundaries, and integration with Tailwind CSS for styling.

## Features

- **Search Star Wars Characters:** Enter a search term to find characters from the Star Wars universe.
- **Error Handling:** Robust error boundaries to gracefully handle API and UI errors.
- **Responsive UI:** Styled with Tailwind CSS for a clean, modern look.
- **Debounced Search:** Reduces unnecessary API calls while typing.
- **Class Components:** Built using React class components for educational purposes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone git@github.com:vzanimonets/REACT2025Q3.git
   cd REACT2025Q3
   git checkout class-component
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App

- **Development mode (with hot reload):**

  ```sh
  npm run dev
  ```

  Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Production build:**

  ```sh
  npm run build
  ```

  The output will be in the `dist/` folder.

- **Preview production build locally:**
  ```sh
  npm run preview
  ```

### Linting & Formatting

- **Lint the code:**
  ```sh
  npm run lint
  ```
- **Auto-format code with Prettier:**
  ```sh
  npm run format:fix
  ```

### Husky (Pre-commit Hook)

- Linting is enforced before each commit using Husky.

## Project Structure

```
REACT2025Q3/
├── public/                # Static assets
├── src/
│   ├── api/               # API utilities (swapi.ts)
│   ├── assets/            # Images and static assets
│   ├── components/        # React components
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind CSS styles
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.ts      # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint
- `npm run format:fix` — Format code with Prettier
- `npm run prepare` — Install Husky hooks

## Technologies Used

- [React](https://react.dev/) 19+
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

> This project is part of the [RS School](https://rs.school/) React 2025Q3 course.
