import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // desactiva warnings por variables no usadas
      "@next/next/no-img-element": "off",         // permite usar <img>
      "react/no-unescaped-entities": "off",       // evita errores por comillas sin escapar
    },
  },
];

export default eslintConfig;
