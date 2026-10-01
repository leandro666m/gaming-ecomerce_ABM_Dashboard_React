# Gaming ABM

Dashboard inicial para administrar el catálogo de una tienda de videojuegos.

## Stack

- React 18 + Vite
- styled-components
- Formik
- Animate UI instalado mediante shadcn (`SlidingNumber`)
- Framer Motion para transiciones del dashboard

## Comandos

```bash
npm install
npm run dev
npm run build
```

La instalación de Animate UI se realiza a través de la CLI de shadcn:

```bash
npx shadcn@latest add @animate-ui/primitives-texts-sliding-number
```

## Acceso y roles

El dashboard requiere iniciar sesión con un usuario activo de la entidad `users`.
El rol `admin` puede acceder a todas las secciones y gestionar usuarios, juegos y
plataformas. El rol `user` no ve la sección Usuarios y no puede editar ni eliminar
juegos o plataformas; conserva la creación de registros.

Los permisos también se validan en el backend: ocultar controles en React no es una
medida de seguridad. Las sesiones usan cookies `HttpOnly` y las operaciones de
escritura del panel requieren token CSRF. En el entorno local, `VITE_API_URL` debe
apuntar al backend en `http://localhost:8080/api`.

Antes de usar el panel, verificá que exista al menos una cuenta activa con rol
`admin`; si no la hay, asigná ese rol a una cuenta confiable mediante un proceso
administrativo seguro en la base de datos. Las contraseñas nuevas se almacenan con
BCrypt. Al iniciar el backend, las contraseñas preexistentes sin hash se migran a
BCrypt sin cambiar las credenciales; el login también actualiza cualquier registro
legado que quede sin migrar.

En despliegues HTTPS, configurá `SERVER_SERVLET_SESSION_COOKIE_SECURE=true` y
`APP_CORS_ALLOWED_ORIGINS` con el origen exacto del dashboard. No uses el valor
local de CORS en producción.
