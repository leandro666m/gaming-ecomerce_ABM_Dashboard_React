# Datos de prueba para la API

Los JSON están preparados para los endpoints de `gamingecomerce.postman_collection.json`.

## Orden de carga

1. `platforms.json` con `POST /api/platforms`.
2. `users.json` con `POST /api/users`.
3. `games.json` con `POST /api/platforms/{platformId}/games`; el `platformId` ya viene en cada objeto y corresponde al ID creado en el paso 1.
4. `addresses.json` con `POST /api/users/{userId}/addresses`, usando los usuarios 1, 2 y 3 respectivamente.
5. `orders.json` con `POST /api/users/{userId}/orders`, usando los usuarios 1, 2 y 3 respectivamente.
6. `order-items.json` con `POST /api/orders/{orderId}/games/{gameId}/items`; las relaciones, en orden, son (1,1), (2,3), (2,4) y (3,3).
7. `wishlists.json` con `POST /api/users/{userId}/wishlist`, usando los usuarios 1, 2 y 4 respectivamente.

Los IDs de relaciones asumen una base vacía y creación en el orden indicado. Si ya existen registros, reemplazá esos IDs por los devueltos por los endpoints GET. Las URLs de imágenes son públicas y sirven para desarrollo; para producción conviene servir los archivos desde el backend o un CDN.
