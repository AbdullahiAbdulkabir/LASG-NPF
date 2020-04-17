self.addEventListener('install', function(event) {
	console.log('[Service Worker] installing Service worker.....', event);
event.waitUntil(caches.open('static')
	.then(function(cache) {
	 cache.add('/')
	 cache.add('/ogun')
	 cache.add('css/index.css')
	 cache.add('dist/css/sb-admin-2.css')	
	 cache.add('imgs/o.PNG')
	 cache.add('http://emajency.com/js/numbers.json')
	 cache.add('http://emajency.com/js/ogunnpf.json')
	 cache.add('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')
	 cache.add('https://fonts.googleapis.com/css?family=Nunito:200,600')
	 cache.add('https://code.jquery.com/jquery-3.2.1.slim.min.js')

	})

);	

});

self.addEventListener('activate', function(event) {
	 caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'static') {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    });

});
self.addEventListener('fetch', function(event) {
	// console.log('[Service Worker] activating Service worker.....', event);
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) {
				return response;
			}else{
				return fetch(event.request);
			}
			})
		);
});