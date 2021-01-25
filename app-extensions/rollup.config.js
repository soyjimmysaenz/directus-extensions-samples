import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript";
import multiInput from "rollup-plugin-multi-input";
import copy from "rollup-plugin-copy";

const EXT_PATH = "../instance/extensions";

const cfgFrontend = {
	input: ["src/interfaces/**/index.ts"],
	output: {
		format: "es",
		dir: EXT_PATH,
	},
	external: ["vue"],
	plugins: [
		multiInput(),
		terser(),
		typescript(),
		resolve({
			mainFields: ["browser", "module", "main"],
		}),
		commonjs(),
		vue(),
		copy({
			targets: [
				//Temporal mientras se crean nuevos componentes
				{ src: "src/layouts/", dest: EXT_PATH },
				{ src: "src/hooks/", dest: EXT_PATH },
				{ src: "src/endpoints/", dest: EXT_PATH },
				{ src: "src/displays/", dest: EXT_PATH },
				{ src: "src/modules/", dest: EXT_PATH },
			],
			copyOnce: true,
			verbose: true,
		}),
	],
};

export default [cfgFrontend];
