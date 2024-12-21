const url = "https://script.google.com/a/macros/west-mec.org/s/AKfycbyJCssM6DrbN8wDW7fbLnRIQsjY-dSQN-1x5KcG9fE0JeBZezmMQptUVdFhXUCK_0yCHA/exec";
const contactSubmit = document.getElementById("contact-submit");

function getValue(tag) {
	return document.getElementById(tag).value;
}

contactSubmit.addEventListener("click", async () => {
	const formData = {
		name: getValue("first-name") + " " + getValue("last-name"),
		email: getValue("email"),
		message: getValue("body"),
	};
	
	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(formData),
		});
	
		const result = await response.json();
		alert(result.result);  // Show success or error message
	} catch (error) {
		console.error('Error:', error);
	}
})