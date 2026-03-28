
self.addEventListener("install",e=>{

e.waitUntil(

caches.open("puzzle-cache")

.then(cache=>cache.addAll([

"/",

"index.html",

"style.css",

"script.js"

]))

);

});
