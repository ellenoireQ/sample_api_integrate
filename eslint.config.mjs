import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {},
  },
];

export default eslintConfig;
