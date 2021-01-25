import InterfaceComponent from "./tq-user-info.vue";

export default {
	id: "tq-user-info",
	name: "User Information",
	description: "Display current user information",
	icon: "person",
	component: InterfaceComponent,
	types: ["alias"],
	groups: ["presentation"],
	options: [
		{
			field: "titleColor",
			name: "Title Color",
			type: "string",
			meta: {
				interface: "color",
				width: "half",
			},
		},
	],
};
