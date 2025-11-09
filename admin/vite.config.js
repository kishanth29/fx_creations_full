import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
      include: [/\.jsx?$/],
    }),
  ],
  esbuild: {
    loader: "jsx",
    include: /\.js$/, //  tells esbuild to treat .js files as JSX
  },
});
