export type User = {
	firstName: string;
	lastName: string;
	email: string;
	avatar: {
		id: string;
	};
};

export function getUserAsync(api: any, userId: string = "me"): Promise<User> {
	if (!api || !api.get) throw new Error("invalid api");
	if (!userId || userId.trim().length === 0) throw new Error("invalid user id");
	return api
		.get(`/users/${userId}`, {
			params: {
				fields: ["email", "first_name", "last_name", "avatar.id", "role.name", "status", "email"],
			},
		})
		.then((response: any) => {
			if (!response || !response.hasOwnProperty("data") || !response.data.hasOwnProperty("data")) {
				throw new Error("invalid response parsing");
			}
			const { first_name: firstName, last_name: lastName, ...rest } = response.data.data;
			return {
				...rest,
				firstName,
				lastName,
			};
		});
}
