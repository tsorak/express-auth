const form = document.querySelector("form");
const form_status = document.querySelector("#form_status");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const data = new FormData(form);
	const formFields = Object.fromEntries(data.entries());

	const method = e.submitter.name === "login" ? "PATCH" : "POST";

	sendForm(formFields, method);
});

const sendForm = async (data, method) => {
	const { email, password } = data;

	try {
		setStatus("Pending...");
		const response = await fetch("/", {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		if (!response.ok) throw response;

		setStatus("Success!");
		const data = await response.json();
		console.log(data);
	} catch (error) {
		switch (error.status) {
			case 400:
				setStatus(error.statusText);
				break;
			case 409:
				setStatus("Email taken!");
				break;
			default:
				setStatus("Something went wrong!");
				break;
		}

		console.error(error);
	}
};

const setStatus = (status) => (form_status.textContent = status);
