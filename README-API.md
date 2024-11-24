# Claims API Documentation

## Índice

1. [Ping API](#ping-api)
2. [Realizar Reclamo](#realizar-reclamo)
3. [Ver Reclamos](#ver-reclamos)
4. [Ver Reclamo por ID](#ver-reclamo-por-id)
5. [Actualizar Estado de Reclamo](#actualizar-estado-de-reclamo)
6. [Ver Tipos de Reclamos](#ver-tipos-de-reclamos)
7. [Crear Tipo de Reclamo](#crear-tipo-de-reclamo)

---

### Ping API

`GET /ping`

Endpoint para verificar el estado del servidor.

#### Respuestas

- `200 OK`: Respuesta exitosa.

---

### Realizar Reclamo

`POST /claims`

Permite a los usuarios crear un nuevo reclamo.

#### Headers

| Cabecera                     | Contenido           |
|------------------------------|---------------------|
| `Authorization: Bearer xxx`  | Token en formato JWT |

#### Body

```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "created_by": "string"
}
```
# Respuestas

### 200 OK
Reclamo creado correctamente.

### 400 Bad Request
Solicitud incorrecta.

### 401 Unauthorized
Token de autorización inválido o ausente.

---

# Ver Reclamos

### GET `/claims`

Devuelve todos los reclamos y sus estados.

### Headers

| Cabecera           | Contenido              |
|--------------------|------------------------|
| Authorization: Bearer xxx | Token en formato JWT |

### Respuesta

#### 200 OK
Lista de reclamos obtenida.

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "created_by": "string",
    "created_at": "2024-11-14T21:15:00.294Z"
  }
]
```
# Ver Reclamo por ID

### GET `/claims/{id}`

Devuelve un reclamo y su estado por ID.

### Headers

| Cabecera           | Contenido              |
|--------------------|------------------------|
| Authorization: Bearer xxx | Token en formato JWT |

### Parámetros

- **id** (string): ID del reclamo a consultar.

### Respuesta

#### 200 OK
Reclamo obtenido correctamente.

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "created_by": "string",
  "created_at": "2024-11-14T21:15:00.294Z"
}
```

# Actualizar Estado de Reclamo

### PUT `/claims/{id}`

Permite a los usuarios actualizar el estado de un reclamo.

### Headers

| Cabecera           | Contenido              |
|--------------------|------------------------|
| Authorization: Bearer xxx | Token en formato JWT |

### Parámetros

- **id** (string): ID del reclamo a actualizar.

### Body

```json
{
  "status": "string"
}
```
# Ver Tipos de Reclamos

### GET `/claim-types`

Devuelve todos los tipos de reclamos disponibles.

### Headers

| Cabecera           | Contenido              |
|--------------------|------------------------|
| Authorization: Bearer xxx | Token en formato JWT |

### Respuesta

#### 200 OK
Lista de tipos de reclamos obtenida.

```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string"
  }
]
```

# Crear Tipo de Reclamo

### POST `/claim-types`

Permite a los usuarios crear un nuevo tipo de reclamo.

### Headers

| Cabecera           | Contenido              |
|--------------------|------------------------|
| Authorization: Bearer xxx | Token en formato JWT |

### Body

```json
{
  "name": "string",
  "description": "string"
}
```