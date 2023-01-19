# CultureInDaHouase - SlackChronicles

Project made at the UOC University - Computer Engineering 

## Arranque de proyecto en desarrollo
Ejecutar el comando `ng serve`. Escribir la ruta `http://localhost:4200/` con el puerto indicado en el navegador. La aplicación se recarga cuando se guardan los archivos. 

Si no se tiene el config instalado y el termina no detecta **ng**, entonces ejecutar el comando `npm run start` o bien configurar el **PATH** del sistema operativo.

## Running unit tests
Ejecutar el comando `ng test` para ejecutar los test unitarios con [Karma](https://karma-runner.github.io).

## Tecnología 
- **Angular** 14
- **Bootstrap** 5

## Características
- Angular **Routing**
- Módulos
-- shared
-- core
- Estructura por *features*
- **Responsive**
- Formularios **reactivos** 

## Actualmente
- **Walking skeleton**

## Historias de usuario
- Crear acto

## Componentes incorporados
- Toastr

## Configuración
La configuración del proyecto se realiza en la carpeta **environment** y se debe editar el entorno que se desee.

#### Configuración en desarrollo

```
{
    environment = {
        production: false,
        apiUrl: 'http://localhost:18081/api',
    };
}
```
