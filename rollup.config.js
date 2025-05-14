import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const PRODUCTION_PLUGIN_CONFIG = {
  input: "src/main.ts",
  output: {
    dir: ".",
    sourcemap: "inline",
    sourcemapExcludeSources: true,
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      include: ["src/**/*.ts"],
      exclude: ["node_modules/**"],
    }),
    nodeResolve({ browser: true }),
    commonjs(),
  ],
};

const DEV_PLUGIN_CONFIG = {
  input: "src/main.ts",
  output: {
    dir: "docs/test-vault/.obsidian/plugins/flashcards-obsidian/",
    sourcemap: "inline",
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian"],
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    {
      name: "force-exit",
      closeBundle() {
        setTimeout(() => process.exit(0), 50);
      },
    },
  ],
};

let configs = [];

if (process.env.BUILD === "dev") {
  configs.push(DEV_PLUGIN_CONFIG);
} else if (process.env.BUILD === "production") {
  configs.push(PRODUCTION_PLUGIN_CONFIG);
} else {
  configs.push(DEV_PLUGIN_CONFIG);
}

export default configs;
