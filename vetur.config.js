module.exports = {
	projects: [
		{
			root: "./app-extensions/",
			// **optional** default: `'package.json'`
			// Where is `package.json` in the project?
			// We use it to determine the version of vue.
			// It is relative to root property.
			package: "./package.json",
			// **optional**
			// Where is TypeScript config file in the project?
			// It is relative to root property.
			tsconfig: "./tsconfig.json",
			// **optional** default: `[]`
			// Register globally Vue component glob.
			// If you set it, you can get completion by that components.
			// It is relative to root property.
			// Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
			globalComponents: ["../../../directus-v9/app/src/components/**/*.vue"],
		},
	],
};
