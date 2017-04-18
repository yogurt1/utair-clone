const CACHE_NAME = Math.random()
  .toString(3)
  .replace(/[^a-z]+/g, '')
  .substr(0, 5)


const assetsToCache = [...serviceWorkerOption.assets, './']
  .map(path => new URL(path, location))

const installCaches = async () => {
  const keys = await caches.keys()
  keys
    .forEach(key => {
      if (key !== CACHE_NAME) {
        caches.delete(key)
      }
    })

  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(assetsToCache)
}

// TODO: Implement
const debugEvent = (eventName, event) => {}

const cachedFetch = async (request) => {
  if (request.method !== 'GET') {
    return fetch(request)
  }

  const cachedResponse = await caches.match(request, {
    ignoreSearch: true
  })

  if (cachedResponse) {
    return cachedResponse
  }

  const response = await fetch(request)

  if (response.ok) {
    const clonedResponse = response.clone()
    caches.open(CACHE_NAME)
      .then(cache => cache.put(request, clonedResponse))
  }

  return response
}

self.addEventListener('install', (event) => {
  debugEvent('install', event)
  if (process.env.NODE_ENV === 'production') {
    // event.waitUntil(installCaches())
  }
})

self.addEventListener('fetch', (event) => {
  debugEvent('fetch', event)
  event.waitUntil(cachedFetch(event.request))
})

self.addEventListener('activate', (event) => {
  debugEvent('activate', event)
})
