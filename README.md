
# Chess Master 🎯

A modern, browser-based chess game built with **TypeScript**, **React**, and **Tailwind CSS**. Play against a friend or test your skills with basic AI—or design your own opponent!

---

## 🚀 Features

- Chessboard rendered in the browser using React.
- Full piece movement, capturing, and basic game rules.
- Two-player mode (local).
- Customizable themes via Tailwind CSS.
- Modular component design for easy feature expansion.

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styles**: Tailwind CSS
- **Tooling**: Vite (dev server + bundler)
- **Code Quality**: ESLint

---

## 🔧 Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/PurvagiriGoswami/Chess_Master.git
   cd Chess_Master
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run locally**  
   ```bash
   npm run dev
   ```
   This starts Vite’s dev server (typically at `localhost:5173`).

4. **Build for production**  
   ```bash
   npm run build
   ```
   Outputs optimized files to `dist/`.

---

## 📁 Project Structure

```
app/             # Entry point & app-level config
components/      # Chessboard, squares, UI components
hooks/           # Custom React hooks (e.g. useGameLogic)
lib/             # Chess rules engine and utilities
public/          # Static assets
tailwind.config.ts
tsconfig.json
.eslintrc.json
```

---

## 🧠 Game Logic

The `lib/` folder contains core chess logic:

- Piece validation
- Legal move detection
- Check, checkmate, and stalemate evaluation

If you’d like to add extra features (e.g., AI, PGN export), this is the ideal place for extensions.

---

## 💡 Customization

- **Themes**: Tweak colors or layouts in `tailwind.config.ts`.
- **Game Modes**: Create a simple AI opponent using `lib/rules.ts` to suggest legal moves.
- **Storage**: Use browser local storage to save game state between sessions.

---

## ✅ Contributing

All contributions are welcome! To contribute:

1. Fork the repository 🐙  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m "Add awesome feature"`)  
4. Push to your fork (`git push origin feature/YourFeature`)  
5. Open a Pull Request ✨

Make sure:
- Code passes ESLint checks (`npm run lint`)
- Functions remain clean and clearly documented

---

## 🧪 Testing (Optional)

Add your own test suite! We recommend using **Jest** with `@testing-library/react`:

```bash
npm install -D jest @testing-library/react @types/jest
```

Configure your test scripts and write tests for components and logic.

---

## 📄 License & Credits

- Built by **Purvagiri Goswami**
- MIT License — see [LICENSE](LICENSE) for full details

---

## ✉️ Contact

Questions or suggestions? Feel free to open an issue or reach out anytime!

---

Enjoy playing 🏰 and feel free to enhance the logic with AI, PGN export, online multiplayer, and more!


