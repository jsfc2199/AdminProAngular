# AdminPro

Admin Pro

## Temas

- Uso del template administrativo
- Código fuente del template
- Uso de librerías externas
- Creación de los primeros componentes
- Separar el Login del template administrativo, ya que tienen estructuras diferentes
- Animaciones por CSS
- Respaldos en GitHub
- Preparar el proyecto que usaremos a lo largo del curso
- Hay una tarea que resolver aquí, mucha suerte!

## Módulos
Esta sección esta enfocada en módulos principalmente:

- Crear un módulo personalizado
- Crear rutas hijas
- Comenzaremos a crear módulos para agrupar tareas específicas
- Realizar cambios en GitHub
- Crear Release Tags que nos permitan descargar el código fácilmente, en caso de que necesitemos volver a comenzar donde nos quedemos.

## Comunicación entre componentes input/output
Esta sección esta dedicada a los componentes y el envío de información entre ellos.

- Trabajaremos con Outputs, Inputs y ViewChild
- Aprenderemos como utilizar atributos personalizados
- Crearemos un componente re utilizable con una funcionalidad en especifico
- Aprenderemos a tener referencias a elementos HTML
- Tips de JavaScript puro: colocar el foco en elementos
- Uso de gráficas como componentes personalizados

## Servicios básicos, temas (colores persistentes en la sesión), rutas básicas y persistencia de los ajustes
- Crearemos un módulo para agrupar todos nuestros servicios
- Aprenderemos a ejecutar scripts en archivos de JavaScript puros, en TypeScript
- LocalStorage
- Cambiar CSS de forma dinámica
- Crear un componente para los ajustes del tema
- Tips de JavaScript que se pueden usar en TypeScript
- Preparar el servicio del Sidebar, el cual usaremos más adelante para crear nuestro menú dinámico en base a las respuestas de nuestro backend server

## Observables y promesas
- Tendremos una introducción ilustrativa para explicar estos dos temas
- Trabajaremos con promesas y funciones que retornan promesas
- Aprenderemos a crear un observable manualmente
- Trabajaremos con operadores de los observables como:
- Retry
- Map
- Filter
- Next
- Funciones que retornan observables
- Usaremos el conocimiento aprendido para crear un componente de seguimiento de la página actual
- Usaremos observables para leer parámetros de configuración de las rutas que son diferentes a los parámetros de las rutas por url
- Cambiaremos los metatags dependiendo de la página donde nos encontremos
- Cambiar el titulo de la página actual

## Sección 14 Implementar login y registro de usuarios
Dado que ya se cuenta con el backend en node podemos continuar

Esta sección tiene por objetivo implementar la seguridad de nuestra aplicación:

- Conectar el Front-end con el Back-end (login)
- Usar Sweet Alert para mostrar mensajes
- Login normal de usuario
- Login de Google
- LocalStorage para almacenar tokens
- Protección básica de rutas
- Logout

## Perfil del usuario, pipes y subida de fotografía
Esta sección se enfoca en varios temas relacionados al perfil del usuario:

- Módulo de pipes 
- Pipe para controlar la imagen a desplegar
- Subida de imagen desde el Front-end hasta el Back-end
- Crear el componente del perfil del usuario
- Notificar actualización de imagen
- Vista previa de la imagen seleccionada en tiempo real (sin subirla al backend)

## Mantenimiento de usuarios y modal de carga de imágenes
Esta sección tiene 2 objetivos generales, el primero es crear un mantenimiento de usuarios completo y el segundo, es crear un componente re utilizable que nos permita subir fácilmente imágenes de Hospitales, Usuarios y Médicos.

Veremos sobre:

- Crear componente de usuarios
- Búsqueda de usuarios
- Borrar usuario
- Actualizar Rol del usuario
- Crear un modal para la subida de la imagen
- Emitir notificaciones de cambio en imágenes
