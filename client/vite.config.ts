import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import svgr from "vite-plugin-svgr"; // make sure to import it

export default defineConfig({
  plugins: [react(), svgr()],
});
