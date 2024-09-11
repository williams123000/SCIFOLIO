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
VITE_URL_API=http://192.168.1.194:4000
VITE_API_INFOUSER=/InfoUser
VITE_API_ABOUT=/About
VITE_API_RESUME=/Resume
VITE_API_PORTFOLIO=/Portfolio
VITE_API_CONTACT=/Contact
VITE_API_LOGIN=/Login
VITE_API_RECOVERYPASSWORD=/resetPassword
VITE_API_REGISTER=/register
VITE_API_IMAGESPROFILE=/imagesProfile
VITE_API_UPLOADINFOPERSONAL=/uploadInfoPersonal
VITE_API_UPLOADINFOABOUT=/uploadAbout
VITE_API_UPLOADINFORESUME=/uploadResume
VITE_API_DELETEEDUCATION=/deleteEducation
VITE_API_DELETEHOBBIE=/deleteHobbie
VITE_API_DELETETESTIMONIAL=/deleteTestimonial
VITE_API_DELETECERTIFICATION=/deleteCertification
VITE_API_DELETEEXPERIENCE=/deleteExperience
VITE_API_DELETESKILL=/deleteSkill

## 🖥️ Uso
Para iniciar la aplicación en modo de desarrollo, ejecuta:
npm run dev

Esto abrirá la aplicación en el navegador, y los cambios que hagas en el código se actualizarán automáticamente.

## 📈 Roadmap
Próximas características:
- **Temas personalizados:** Permitirá a los usuarios personalizar la apariencia de su portafolio.
- **Soporte multilingüe:** La plataforma se podrá utilizar en varios idiomas.

## 🤝 Contribuciones
¡Contribuciones, ideas y mejoras son bienvenidas!

## 📄 Licencia
Este proyecto está bajo la [licencia MIT](./LICENSE).
