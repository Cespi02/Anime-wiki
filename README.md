El proyecto consta del frontend realizado por react, creando complementos en lugares redundantes de la página (Navbar, Animes, Containers) de esta manera se puede alcanzar una gran cantidad de contenido en muy poco codigo. 
Se crea una pagina por cada anime de manera dinámica asi como las imagenes en el carrousel que son un metodo de ingreso a ellas. Cada pagina de anime tiene una sección de comentarios a la que solo pueden comentar personas con la sesión iniciada.
Hay un sistema de sesiones por tokens en la que, el frontend se comúnica con el backend en ASP.NET mediante API y esta le devuelve un token que se asigna a una cookie del navegador para verificar que hay una sesión iniciada.
El proyecto todavia se sigue puliendo y falta por optimizar y limpiar codigo.
