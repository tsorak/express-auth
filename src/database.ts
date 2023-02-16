import * as bcrypt from "bcrypt";

interface User {
	email: string;
	password: string;
}

const database = {
	users: [
		{
			id: 1,
			email: "john.doe@mail.com",
			password: bcrypt.hashSync("123", 10)
		}
	]
};

function addUser(user: User) {
	const { password } = user;
	user.password = bcrypt.hashSync(password, 10);

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
	return bcrypt.compareSync(password, user.password);
}

function getUsers() {
	return database.users;
}

function getUserId(email: string) {
	const user = database.users.find((user) => user.email === email);
	if (!user) throw new Error("User does not exist");
	return user.id;
}

export { addUser, existsUser, isCorrectUserDetails, getUsers, getUserId };
