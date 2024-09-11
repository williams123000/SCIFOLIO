# 🌟 SCIFOLIO

**SCIFOLIO** es una aplicación web moderna y profesional que permite a los usuarios gestionar y mostrar su perfil personal y profesional. La plataforma ofrece una interfaz intuitiva para que los usuarios puedan personalizar su información, desde testimonios y certificaciones hasta hobbies e intereses, con un diseño responsivo y elegante. Perfecta para quienes desean crear su propio portafolio digital.

## 🚀 Características Principales

- **👤 Perfil Personalizado:** Permite a los usuarios agregar y editar su información personal, incluyendo su nombre, correo, teléfono, y ubicación.
- **🏆 Testimonios:** Los usuarios pueden agregar recomendaciones de colegas o amigos, incluyendo imágenes y descripciones personalizadas.
- **🎓 Certificaciones:** Muestra certificaciones y logros profesionales, con la opción de incluir títulos e imágenes.
- **🌟 Hobbies e Intereses:** Los usuarios pueden destacar sus pasatiempos, mostrando lo que los motiva fuera del trabajo.
- **📑 Resumen Profesional:** Incluye secciones de educación, experiencia laboral y habilidades, que los usuarios pueden actualizar fácilmente.
- **📁 Portafolio:** Exhibe investigaciones, publicaciones y experimentos con títulos e imágenes.
- **✉️ Contacto:** Un formulario interactivo para que otros puedan enviar mensajes fácilmente.
- **🖼️ Diseño Responsivo:** La interfaz se adapta perfectamente a cualquier dispositivo, brindando una experiencia de usuario fluida y moderna.
- **🖼️ Modales Interactivos:** Los detalles adicionales se muestran en ventanas modales elegantes y accesibles.

## 🛠️ Tecnologías Utilizadas

- **React**: Para crear interfaces de usuario rápidas y modulares.
- **React Icons**: Iconos llamativos que complementan la estética de la aplicación.
- **Bootstrap**: Estilos modernos y diseño responsivo para una experiencia consistente en diferentes dispositivos.
- **Axios**: Manejo de peticiones HTTP para la comunicación con APIs.
- **Firebase**: Autenticación y almacenamiento de datos en tiempo real.

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado **Node.js** en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### Clonar el repositorio

```bash
git clone https://github.com/williams/SCIFOLIO.git

Navegar al directorio del proyecto:
cd SCIFOLIO

### Instalar dependencias
npm install
```

## 🌐 Configuración del Entorno
Para que la aplicación funcione correctamente, necesitas un archivo .env en la raíz del proyecto con la siguiente información (donde iran todas las rutas):
```bash
# URL base de la API
- VITE_URL_API=http://your-api-url-here

# Endpoints para las diferentes funcionalidades
- VITE_API_INFOUSER=/your-info-user-endpoint
- VITE_API_ABOUT=/your-about-endpoint
- VITE_API_RESUME=/your-resume-endpoint
- VITE_API_PORTFOLIO=/your-portfolio-endpoint
- VITE_API_CONTACT=/your-contact-endpoint
- VITE_API_LOGIN=/your-login-endpoint
- VITE_API_RECOVERYPASSWORD=/your-password-recovery-endpoint
- VITE_API_REGISTER=/your-register-endpoint
- VITE_API_IMAGESPROFILE=/your-images-profile-endpoint

# Endpoints para subir información
- VITE_API_UPLOADINFOPERSONAL=/your-upload-info-personal-endpoint
- VITE_API_UPLOADINFOABOUT=/your-upload-info-about-endpoint
VITE_API_UPLOADINFORESUME=/your-upload-info-resume-endpoint

# Endpoints para eliminar información
- VITE_API_DELETEEDUCATION=/your-delete-education-endpoint
- VITE_API_DELETEHOBBIE=/your-delete-hobbie-endpoint
- VITE_API_DELETETESTIMONIAL=/your-delete-testimonial-endpoint
- VITE_API_DELETECERTIFICATION=/your-delete-certification-endpoint
- VITE_API_DELETEEXPERIENCE=/your-delete-experience-endpoint
- VITE_API_DELETESKILL=/your-delete-skill-endpoint
```

## 🖥️ Uso
Para iniciar la aplicación en modo de desarrollo, ejecuta:
```bash
npm run dev
```
Esto abrirá la aplicación en el navegador, y los cambios que hagas en el código se actualizarán automáticamente.

## 📸 Capturas de Pantalla
<p align="center">
  <img src="https://github.com/williams123000/SCIFOLIO/blob/main/src/assets/images/editPerfil.png">
</p>
<p align="center">
  <img src="https://github.com/williams123000/SCIFOLIO/blob/main/src/assets/images/principal.png">
</p>

## 📈 Roadmap
Próximas características:
- **Temas personalizados:** Permitirá a los usuarios personalizar la apariencia de su portafolio.
- **Soporte multilingüe:** La plataforma se podrá utilizar en varios idiomas.

## 🤝 Contribuciones
¡Contribuciones, ideas y mejoras son bienvenidas!
- **Correo Electrónico Personal:** [williamschan72@gmail.com](mailto:williamschan72@gmail.com)
- **Correo Electrónico Institucional:** [williams.chan@cua.uam.mx](mailto:williams.chan@cua.uam.mx)

## 📄 Licencia
Este proyecto está bajo la [licencia MIT](./LICENSE).

