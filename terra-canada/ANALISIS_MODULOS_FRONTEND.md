# 📊 Análisis de Módulos del Frontend - Terra Canada

## 📋 Requerimientos del Sistema

### Vistas por Equipo (Usuario)
- ✅ Dashboard (En desarrollo)
- ✅ Equipo Tarjetas
- ✅ Gmail - GEN (En desarrollo) + nuevo módulo
- ✅ Eventos
- ✅ Documentos (En desarrollo)
- ✅ Tarjetas (En desarrollo)
- ✅ Configuración (En desarrollo)

### Vistas por Administrador (Finanzas)
- ✅ Dashboard (En desarrollo)
- ✅ Financieras - C.Bancaria (En desarrollo)
- ✅ Financieros - Tarjetas (LO MISMO - EQUIPO)
- ✅ Gmail - GEN (En desarrollo)
- ✅ Análisis (En desarrollo)
- ✅ Eventos
- ✅ Documentos (En desarrollo)
- ✅ Tarjetas (En desarrollo)
- ✅ Configuración (En desarrollo)

---

## 🔐 Control de Acceso por Rol

### Administrador
**Permisos**: 20 permisos totales
- ✅ Ver todos los datos
- ✅ Crear, editar, eliminar usuarios
- ✅ Ver todos los pagos
- ✅ Ver todos los eventos
- ✅ Acceso a configuración avanzada
- ✅ Gestionar tarjetas y cuentas bancarias

### Equipo
**Permisos**: 12 permisos limitados
- ✅ Registrar pagos
- ✅ Ver solo sus propios pagos
- ✅ Ver eventos relacionados a su cuenta
- ✅ Editar estado y verificación de pagos
- ❌ No puede crear usuarios
- ❌ No puede acceder a configuración avanzada

---

## 📁 Estructura de Módulos Necesarios

### 1. **Módulo de Autenticación** ✅ COMPLETADO
```
src/app/features/auth/
├── login/
│   ├── login.component.ts (MODIFICADO)
│   ├── login.component.html
│   └── login.component.scss
└── guards/
    └── auth.guard.ts (MEJORADO)
```

**Estado**: ✅ Conectado con backend
- Login con nombre_usuario
- Almacenamiento de token en localStorage
- Carga de usuario y permisos

---

### 2. **Módulo de Dashboard** ⏳ EN DESARROLLO
```
src/app/features/dashboard/
├── dashboard.component.ts
├── dashboard.component.html
├── dashboard.component.scss
└── components/
    ├── kpi-cards/
    ├── recent-activity/
    └── charts/
```

**Requerimientos**:
- Mostrar KPIs según rol
- Admin: Ver resumen de todos los pagos
- Equipo: Ver resumen de sus pagos
- Gráficos de pagos por estado
- Actividad reciente

---

### 3. **Módulo de Pagos** ⏳ EN DESARROLLO
```
src/app/features/pagos/
├── pagos.component.ts
├── pagos.component.html
├── pagos.component.scss
├── components/
│   ├── pago-list/
│   ├── pago-form/
│   ├── pago-detail/
│   └── pago-verify/
└── services/
    └── pago.service.ts
```

**Requerimientos**:
- Registrar pago (Equipo + Admin)
  - Seleccionar Cliente (PAXS)
  - Seleccionar Proveedor (Presta)
  - Correo del proveedor (editable con confirmación)
  - Seleccionar Tarjeta (USD/CAD)
  - Ingresar Monto
  - Ingresar N° Presta (manual, alfanumérico)
  - Comentarios (opcional)
  
- Listar pagos (filtrado por rol)
  - Admin: Ver todos
  - Equipo: Ver solo suyos
  - Columnas: Fecha, Cliente, Proveedor, Monto, Moneda, N° Presta, Comentario, Usuario, Estado, Verificado
  - Acciones: Ver, Editar, Eliminar, Descargar PDF
  
- Editar pago
  - Solo estado y verificación
  
- Verificar pago
  - Cambiar a PAGADO
  - Marcar como verificado
  - Actualizar saldo de tarjeta

---

### 4. **Módulo de Clientes** ⏳ EN DESARROLLO
```
src/app/features/clientes/
├── clientes.component.ts
├── clientes.component.html
├── clientes.component.scss
├── components/
│   ├── cliente-list/
│   ├── cliente-form/
│   └── cliente-detail/
└── services/
    └── cliente.service.ts
```

**Requerimientos**:
- CRUD Clientes (Equipo + Admin)
- Modal para crear cliente rápido desde pago
- Campos: Nombre, Ubicación, Teléfono, Correo
- Búsqueda por nombre o correo

---

### 5. **Módulo de Proveedores** ⏳ EN DESARROLLO
```
src/app/features/proveedores/
├── proveedores.component.ts
├── proveedores.component.html
├── proveedores.component.scss
├── components/
│   ├── proveedor-list/
│   ├── proveedor-form/
│   └── proveedor-detail/
└── services/
    └── proveedor.service.ts
```

**Requerimientos**:
- CRUD Proveedores (Equipo + Admin)
- Modal para crear proveedor rápido desde pago
- Campos: Nombre, Servicio, Teléfono, Teléfono2, Correo, Correo2, Descripción
- Búsqueda por nombre, servicio o correo
- Filtro por servicio

---

### 6. **Módulo de Tarjetas** ⏳ EN DESARROLLO
```
src/app/features/tarjetas/
├── tarjetas.component.ts
├── tarjetas.component.html
├── tarjetas.component.scss
├── components/
│   ├── tarjeta-list/
│   ├── tarjeta-form/
│   └── tarjeta-detail/
└── services/
    └── tarjeta.service.ts
```

**Requerimientos**:
- Listar tarjetas (4 tipos: USD 2, CAD 2)
- Mostrar saldo actual
- Admin: Crear, editar, desactivar tarjetas
- Equipo: Solo lectura
- Mostrar cuentas bancarias asociadas

---

### 7. **Módulo de Eventos** ⏳ EN DESARROLLO
```
src/app/features/eventos/
├── eventos.component.ts
├── eventos.component.html
├── eventos.component.scss
├── components/
│   ├── evento-list/
│   ├── evento-filtros/
│   └── evento-detail/
└── services/
    └── evento.service.ts
```

**Requerimientos**:
- Listar eventos (filtrado por rol)
  - Admin: Ver todos
  - Equipo: Ver solo de usuarios Equipo
  
- Dos tipos de eventos:
  - ACCION (Crear, Actualizar, Eliminar, Verificar Pago)
  - NAVEGACION (Interacción en interfaz)
  
- Filtros:
  - Por tipo de evento
  - Por acción
  - Por fecha (desde/hasta)
  - Por usuario (solo admin)
  - Por tipo de entidad
  
- Columnas: Fecha, Usuario, Tipo, Acción, Descripción, Entidad

---

### 8. **Módulo de Documentos** ⏳ EN DESARROLLO
```
src/app/features/documentos/
├── documentos.component.ts
├── documentos.component.html
├── documentos.component.scss
├── components/
│   ├── documento-list/
│   ├── documento-upload/
│   └── documento-detail/
└── services/
    └── documento.service.ts
```

**Requerimientos**:
- Listar documentos por pago
- Tipos: Factura, Documento Banco, Recibo, Otro
- Upload de archivos
- Descargar documentos
- Eliminar documentos (solo admin)

---

### 9. **Módulo de Configuración** ⏳ EN DESARROLLO
```
src/app/features/configuracion/
├── configuracion.component.ts
├── configuracion.component.html
├── configuracion.component.scss
└── components/
    ├── configuracion-perfil/
    ├── configuracion-notificaciones/
    └── configuracion-seguridad/
```

**Requerimientos**:
- **Perfil**: Editar nombre, teléfono, email
- **Seguridad**: Cambiar contraseña
- **Notificaciones**: Activar/desactivar (Email, Push, SMS)
- **Usuarios** (Solo Admin): Crear, editar, desactivar usuarios

---

### 10. **Módulo de Financieras** ⏳ EN DESARROLLO (Solo Admin)
```
src/app/features/financieras/
├── cuentas-bancarias/
│   ├── cuentas-list.component.ts
│   ├── cuentas-form.component.ts
│   └── cuentas-detail.component.ts
└── services/
    └── cuenta-bancaria.service.ts
```

**Requerimientos**:
- CRUD Cuentas Bancarias
- Asociadas a Tarjetas
- Campos: Número Cuenta, Banco, Titular, Estado

---

### 11. **Módulo de Análisis** ⏳ EN DESARROLLO (Solo Admin)
```
src/app/features/analisis/
├── analisis.component.ts
├── analisis.component.html
├── analisis.component.scss
└── components/
    ├── pagos-por-estado/
    ├── pagos-por-cliente/
    ├── pagos-por-proveedor/
    └── tendencias/
```

**Requerimientos**:
- Gráficos de pagos por estado
- Gráficos de pagos por cliente
- Gráficos de pagos por proveedor
- Tendencias de pagos
- Reportes exportables

---

## 🔐 Implementación de Permisos en Frontend

### AuthGuard Mejorado
```typescript
// Proteger rutas por permiso
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredPermission = route.data['permission'];
  return this.authService.hasPermission(requiredPermission);
}

// Proteger rutas por rol
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredRole = route.data['role'];
  return this.authService.hasRole(requiredRole);
}
```

### Directivas de Permisos
```typescript
// *appHasPermission="'pagos.crear'"
// *appHasRole="'Administrador'"
// *appHasAnyRole="['Administrador', 'Equipo']"
```

### Métodos en AuthService
```typescript
hasPermission(permiso: string): boolean
hasRole(rol: string): boolean
hasAnyRole(roles: string[]): boolean
```

---

## 📊 Matriz de Acceso por Módulo

| Módulo | Equipo | Admin | Permisos Requeridos |
|---|---|---|---|
| Dashboard | ✅ | ✅ | - |
| Pagos | ✅ | ✅ | pagos.crear, pagos.leer, pagos.editar, pagos.verificar |
| Clientes | ✅ | ✅ | clientes.crear, clientes.leer, clientes.editar |
| Proveedores | ✅ | ✅ | proveedores.crear, proveedores.leer, proveedores.editar |
| Tarjetas | ✅ (lectura) | ✅ | tarjetas.leer, tarjetas.editar |
| Eventos | ✅ | ✅ | eventos.leer, eventos.filtrar |
| Documentos | ✅ | ✅ | - |
| Configuración | ✅ (limitado) | ✅ | configuracion.leer, configuracion.editar |
| Financieras | ❌ | ✅ | - |
| Análisis | ❌ | ✅ | - |

---

## 🚀 Plan de Implementación

### Fase 1: Autenticación ✅ COMPLETADA
- [x] Modificar login para usar nombre_usuario
- [x] Conectar con backend
- [x] Almacenar token y usuario
- [x] Crear interceptor JWT
- [x] Crear AuthGuard mejorado

### Fase 2: Módulos Básicos (Próxima)
- [ ] Dashboard con KPIs
- [ ] Módulo de Pagos (CRUD)
- [ ] Módulo de Clientes (CRUD)
- [ ] Módulo de Proveedores (CRUD)

### Fase 3: Módulos Avanzados
- [ ] Módulo de Tarjetas
- [ ] Módulo de Eventos
- [ ] Módulo de Documentos
- [ ] Módulo de Configuración

### Fase 4: Módulos Admin
- [ ] Módulo de Financieras
- [ ] Módulo de Análisis
- [ ] Gestión de Usuarios

---

## 🔄 Flujo de Datos

```
Login
  ↓
AuthService.login() → Backend /api/v1/auth/login
  ↓
Guardar token + usuario en localStorage
  ↓
Cargar permisos y rol
  ↓
Redirigir a Dashboard
  ↓
Cada request incluye token via AuthInterceptor
  ↓
Si 401 → Logout y redirigir a login
```

---

## 📝 Notas Importantes

1. **Nombre de Usuario**: El login usa `nombre_usuario`, no correo
2. **Permisos**: Se obtienen del backend en el login
3. **Token**: Se almacena en localStorage y se envía en cada request
4. **Filtrado por Rol**: El backend filtra datos según el rol del usuario
5. **Admin Acceso Total**: El administrador tiene acceso a todos los módulos
6. **Equipo Acceso Limitado**: El equipo solo ve sus propios datos

---

**Última actualización**: Diciembre 13, 2025
**Versión**: 1.0.0
**Estado**: Análisis completado, listo para implementación
