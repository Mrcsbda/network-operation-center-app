# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

## dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
MAILER_EMAIL=
MAILER_SECRET_KEY=
MAILER_SERVICE=
PROD=
PORT=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

3. Ejecutar el comando

```
yarn i
```

4. Levantar las bases de datos con el comando

```
docker compose up -d
```

5. Ejecutar el comando

```
npx prisma migrate dev
```

6. Ejecutar

```
yarn dev
```
