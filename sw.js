// Service Worker for NayacMard Store
// Provides basic offline functionality and caching

const CACHE_NAME = 'nayacmard-store-v1';
const STATIC_CACHE = 'nayacmard-static-v1';
const DYNAMIC_CACHE = 'nayacmard-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/assets/products.js',
    '/manifest.webmanifest',
    '/favicons/favicon.ico',
    '/favicons/android-chrome-192x192.png',
    '/favicons/android-chrome-512x512.png',
    '/favicons/apple-touch-icon.png'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .catch((error) => {
                console.log('Failed to cache static files:', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (url.origin !== self.location.origin) {
        return;
    }

    // Handle different types of requests
    if (request.destination === 'document' || request.destination === '') {
        // HTML pages - network first, fallback to cache
        event.respondWith(networkFirst(request));
    } else if (request.destination === 'style' || request.destination === 'script') {
        // CSS/JS - cache first, fallback to network
        event.respondWith(cacheFirst(request));
    } else if (request.destination === 'image') {
        // Images - cache first, fallback to network
        event.respondWith(cacheFirst(request));
    } else {
        // Other resources - network first, fallback to cache
        event.respondWith(networkFirst(request));
    }
});

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Return offline page for HTML requests
        if (request.destination === 'document' || request.destination === '') {
            return caches.match('/index.html');
        }
        throw error;
    }
}

// Cache first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Return a default response for images
        if (request.destination === 'image') {
            return new Response('', {
                status: 404,
                statusText: 'Image not found'
            });
        }
        throw error;
    }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Handle any pending offline actions
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/favicons/android-chrome-192x192.png',
            badge: '/favicons/favicon-32x32.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
