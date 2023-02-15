interface User {
	email: string;
	password: string;
}

const database = {
	users: [
		{
			id: 1,
			email: "john.doe@mail.com",
			password: "123456"
		}
	]
};

function addUser(user: User) {
	const addedUser = { id: database.users.length + 1, ...user };
	database.users.push(addedUser);
	return { id: addedUser.id, email: addedUser.email };
}

function existsUser(email: string) {
	return database.users.some((user) => user.email === email);
}

function isCorrectUserDetails(email: string, password: string) {
	const user = database.users.find((user) => user.email === email);
	if (!user) return false; // User does not exist
	return user.password === password;
}

export { addUser, existsUser, isCorrectUserDetails };
