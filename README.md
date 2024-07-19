# Importante leer

El proyecto presentado está construido en React y Vite. Lo más importante de hacer con Vite es que los proyectos se hacen mas ligeros, ya que a diferencia de usar Create react, este solamente usa los componentes necesarios para que funcione react.
así que sí, si vas a usar react, usa vite también tu compu te va a agradecer. 

# ¿Qué es este proyecto? 

El objetivo de este proyecto fue aprender a usar react, por lo que decidí implementar una funcionalidad para buscar personas por su nombre y que me diga en base de su cedula, cuantos puntos de licencia tiene y si es contribuyente del SRI. 
Para la ejecución de este, se consumieron 3 servicios, uno el que te retorna los puntos de licencia, otro servicio que al pasarle un número de ruc, te dice si es contribuyente del SRI o no. Y por último se uso un servicio que era el que traía la información en formato JSON de todos las personas. Esta información fue sacada de una bdd informal (un excel que encontre en internet) Y a este se le llevo a bdd relacional, en la cuál cree campos para el nombre, apellido y la cedula. 

# Funcionalidad principal

Al ejecutar el proyecto, te daras cuenta de que hay una barra de busqueda y un botón, lo que hace basicamente es que tu al escribir un nombre te da una sugerencias de nombres, las cuales tu puedes seleccionar. Al seleccionar uno y darle a buscar, nos ejecutara los otros dos servicios para buscarle en base a su cédula del registro seleccionado. La página nos retornara si esta persona es contribuyente del SRI y cuantos puntos de licencia tiene, si es que posee una. 

