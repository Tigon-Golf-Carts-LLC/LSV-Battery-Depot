// LSV Battery Depot Service Worker
// Enhanced PWA functionality and offline capabilities

const CACHE_NAME = 'lsv-battery-depot-v1';
const OFFLINE_URL = '/offline.html';

// Resources to cache for offline functionality
const CACHE_RESOURCES = [
  '/',
  '/products',
  '/battery-selector', 
  '/battery-guide',
  '/contact',
  '/favicon.png',
  '/manifest.json',
  '/offline.html',
  // Add critical CSS and JS files
  '/assets/index.css',
  '/assets/index.js'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  console.log('LSV Battery Depot Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential resources for offline access');
        return cache.addAll(CACHE_RESOURCES);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('LSV Battery Depot Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Ensure the new service worker takes control immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, serve cached page or offline page
          return caches.match(event.request)
            .then(response => response || caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  // Handle all other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Return cached version
          return response;
        }
        
        // Try to fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('LSV Battery Depot: Background sync triggered');
    event.waitUntil(syncOfflineData());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  console.log('LSV Battery Depot: Push notification received');
  
  let notificationData = {
    title: 'LSV Battery Depot',
    body: 'New battery deals and updates available!',
    icon: '/favicon.png',
    badge: '/favicon.png',
    data: {
      url: '/'
    }
  };

  if (event.data) {
    try {
      notificationData = JSON.parse(event.data.text());
    } catch (error) {
      console.log('Error parsing push notification data:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      data: notificationData.data,
      actions: [
        {
          action: 'view',
          title: 'View Products'
        },
        {
          action: 'call',
          title: 'Call Experts'
        }
      ]
    })
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('LSV Battery Depot: Notification clicked');
  
  event.notification.close();

  if (event.action === 'call') {
    // Open phone dialer
    event.waitUntil(
      clients.openWindow('tel:1-844-888-7732')
    );
  } else {
    // Open website
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then(clientList => {
        // Check if the site is already open
        for (let client of clientList) {
          if (client.url.includes('lsvbatterydepot.com') && 'focus' in client) {
            client.focus();
            return client.navigate(urlToOpen);
          }
        }
        
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Sync offline data when connection is restored
async function syncOfflineData() {
  try {
    // Check for offline form submissions or cart data
    const offlineData = await getOfflineData();
    
    if (offlineData.length > 0) {
      console.log('LSV Battery Depot: Syncing offline data...');
      
      for (let data of offlineData) {
        try {
          await fetch(data.url, {
            method: data.method,
            headers: data.headers,
            body: data.body
          });
          
          // Remove synced data from offline storage
          await removeOfflineData(data.id);
          
        } catch (error) {
          console.log('Failed to sync data item:', error);
        }
      }
    }
  } catch (error) {
    console.log('Error during background sync:', error);
  }
}

// Helper functions for offline data management
async function getOfflineData() {
  // Implement offline data retrieval from IndexedDB
  return [];
}

async function removeOfflineData(id) {
  // Implement offline data removal from IndexedDB
  console.log('Removing synced offline data:', id);
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME
    });
  }
});

console.log('LSV Battery Depot Service Worker loaded successfully');