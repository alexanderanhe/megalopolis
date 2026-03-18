# Megalopolis API

Backend modular en Node.js + Express para agregar micro APIs y alimentar un dashboard personal.

## Requisitos

- Node.js 18+

## Instalacion

~~~bash
npm install
~~~

## Desarrollo

~~~bash
npm run dev
~~~

## Build

~~~bash
npm run build
~~~

## Produccion

~~~bash
npm run start
~~~
## Variables de entorno

Copia el archivo .env.example a .env y ajusta los valores segun tu entorno.
WEATHER_PROVIDER y HNC_PROVIDER definen el adapter activo, por defecto mock.

## Estructura del proyecto

~~~
src/
  app.ts
  server.ts
  config/
    env.ts
  routes/
    index.ts
    health.routes.ts
    dashboard.routes.ts
    hoyNoCircula.routes.ts
    weather.routes.ts
  controllers/
    health.controller.ts
    dashboard.controller.ts
    hoyNoCircula.controller.ts
    weather.controller.ts
  services/
    hoyNoCircula.service.ts
    weather.service.ts
    dashboard.service.ts
  providers/
    hoyNoCircula/
      index.ts
      provider.ts
      mock.provider.ts
    weather/
      index.ts
      provider.ts
      mock.provider.ts
  validators/
    common.validators.ts
    weather.validators.ts
  middlewares/
    errorHandler.ts
    notFound.ts
    rateLimiter.ts
  utils/
    apiError.ts
    asyncHandler.ts
    cache.ts
    logger.ts
    date.ts
  jobs/
    refreshCache.job.ts
~~~

## Endpoints disponibles

- GET /health
- GET /hoy-no-circula/today
- GET /weather/current?city=cdmx
- GET /dashboard/home
- GET /docs

## Ejemplos de respuesta

### Health

~~~json
{
  "success": true,
  "message": "API is running"
}
~~~

### Hoy No Circula

~~~json
{
  "success": true,
  "updatedAt": "2026-03-18T00:00:00.000Z",
  "data": {
    "date": "2026-03-18",
    "scope": ["CDMX", "EDOMEX"],
    "restrictionStart": "05:00",
    "restrictionEnd": "22:00",
    "restrictions": {
      "color": "rojo",
      "plateEndings": [3, 4],
      "holograms": ["1", "2"]
    },
    "exemptions": ["00", "0", "eléctricos", "híbridos"]
  }
}
~~~

### Weather

~~~json
{
  "success": true,
  "updatedAt": "2026-03-18T00:00:00.000Z",
  "data": {
    "city": "cdmx",
    "temperatureC": 22,
    "humidity": 48,
    "condition": "Parcialmente nublado",
    "windKph": 12
  }
}
~~~

### Dashboard Home

~~~json
{
  "success": true,
  "updatedAt": "2026-03-18T00:00:00.000Z",
  "data": {
    "hoyNoCircula": { "...": "..." },
    "weather": { "...": "..." }
  }
}
~~~

## Como agregar nuevas micro APIs

1. Crea un servicio en src/services que obtenga o construya la data.
2. Agrega validadores en src/validators si hay parametros.
3. Crea un controlador en src/controllers que use el servicio.
4. Registra una nueva ruta en src/routes y agregala a src/routes/index.js.
5. Si quieres cache, usa src/utils/cache.js y define un TTL por modulo en .env.
6. Si quieres cambiar la fuente de datos, crea un provider en src/providers y ajusta WEATHER_PROVIDER o HNC_PROVIDER.
7. Si quieres refresco programado, agrega la llamada en src/jobs/refreshCache.job.js.

## Notas de arquitectura

- Monolito modular con separacion por capas para facilitar crecimiento.
- Cache en memoria con TTL y proveedores desacoplados para migrar a integraciones reales facilmente.
- Validacion con Zod y manejo de errores centralizado.
