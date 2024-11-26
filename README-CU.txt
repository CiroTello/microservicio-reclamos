Microservicio de reclamo: "El usuario reclama algo de la orden, permitiendo cancelarla si no se resuelve el reclamo correctamente."

------------------------------------------------------
CU: Realizar reclamo (Usuario cliente)
	- Precondicion: 
		* Estar logueado
		* Atributo estado se debe enviar como "CREADO"
	- Camino normal: 
		* Al seleccionar un boton de "RECLAMO" 
		* Validaciones:
			** Nombre != null
		* Se crea el reclamo con:
			** Nombre del reclamo
			** Descripcion del reclamo
			** Estado del reclamo
			** Usuario
			** Tipo Reclamo id
			** Orden
		* Estado del reclamo se guarda como "CREADO"
	- Camino alternativo:		
		* Si no encuentra la orden no dejar hacer reclamos 

------------------------------------------------------
CU: Procesar reclamo (Usuario admin)
	- Precondicion: 
		* Reclamo en estado "CREADO"
		* Estar logueado
		* Atributo estado se debe enviar como "EN PROCESO"
	- Camino normal: 
		* Al seleccionar boton de "ATENDER RECLAMO"
		* Validaciones:
			** id != null 
			** estado != null
		* Cambia el estado del reclamo a "EN PROCESO"

------------------------------------------------------	
CU: Cancelar reclamo (Usuario cliente)
	- Precondicion: 
		* Reclamo en estado "CREADO"
		* Estar logueado
		* Atributo estado se debe enviar como "CANCELADO"
	- Camino normal: 
		* Seleccionar boton de "CANCELAR RECLAMO" 
		* Validaciones:
			** id != null 
			** estado != null
		* Actualiza el estado del reclamo a CANCELADO
		* Actualiza atributo "resuelto" del reclamo

------------------------------------------------------
CU: Cancelar reclamo (Usuario admin)
	- Precondicion: 
		* Reclamos en estados "EN PROCESO"
		* Estar logueado
		* Atributo estado se debe enviar como "CANCELADO"
	- Camino normal: 
		* Al seleccionar boton de "CANCELAR RECLAMO"
		* Validaciones: 
			** id != null 
			** estado != null
		* Actualiza el estado del reclamo a "CANCELADO"
		* Actualiza atributo "resuelto" del reclamo

------------------------------------------------------
CU: Resolver reclamo (Usuario admin)
	- Precondicion: 
		* Reclamos en estados "EN PROCESO"
		* Estar logueado
		* Atributo estado se debe enviar como "FINALIZADO"
	- Camino normal: 
		* Al seleccionar boton de "RESOLVER RECLAMO"
		* Validaciones:
			** id != null 
			** estado != null
		* Actualiza el estado del reclamo a "FINALIZADO"
		* Actualiza atributo "resuelto" del reclamo
	- Camino alternativo:
		* Si la "resolucion" es positiva: emitir mensaje a MS Order pidiendo cancelar la orden
 
------------------------------------------------------
CU: Ver reclamos con sus estados (Usuario cliente)
	- Precondicion: 
		* Estar logueado
	- Camino normal: 
		* Al seleccionar boton "RECLAMOS"
		* Mostrar los reclamos hechos con todos sus atributos y relaciones
	- Camino alternativo:
		* Si no hay reclamos, mostrar "Nada por aquí" 

------------------------------------------------------
CU: Ver reclamos con sus estados (Usuario admin)
	- Precondicion: 
		* Estar logueado
	- Camino normal: 
		* Al seleccionar boton "RECLAMOS"
		* Elegir filtro por estado reclamo si se desea
		* Mostrar los reclamos hechos con todos sus atributos y relaciones (filtrados si es el caso)
	- Camino alternativo:
		* Si no hay reclamos, mostrar "Nada por aquí" 

------------------------------------------------------
CU: Alta Tipo de reclamo (Usuario admin)
	- Precondicion: 
		* Estar logueado
	- Camino normal: 
		* Al seleccionar un boton de "CREAR TIPO RECLAMO"
		* Validaciones:
			** nombre != null
			** descripcion != null
			** fechaBaja == null
		* Se crea el tipo reclamo con:
			** id
			** nombre
			** descripcion
			** fechaBaja == null
	- Camino alternativo:
		* Si se crean dos tipos con nombres iguales lanzar error

------------------------------------------------------
CU: Baja Tipo de reclamo (Usuario admin)
	- Precondicion: 
		* Estar logueado
		* Tipo reclamo existente
	- Camino normal: 
		* Al seleccionar un boton de "ELIMINAR TIPO RECLAMO"
		* Validaciones:
			** id != null
			** fechaBaja == null
		* Se setea la fechaBaja al tipo reclamo con el id enviado

	- Camino alternativo:
		* Si no lo encuentra lanza error "Tipo reclamo con id: {} no encontrado".

------------------------------------------------------
CU: Ver Tipos de reclamo (Usuario admin)
	- Precondicion: 
		* Estar logueado
	- Camino normal: 
		* Al seleccionar un boton de "VER TIPO RECLAMO"						
		* Se obvservan todos los tipos de reclamos fitlrados por fecha baja
	- Camino alternativo:
		* Si no encuentra ninguno muestra "Nada por aqui"

------------------------------------------------------
Consideraciones:
	- estados de reclamos:
		* CREADO
		* EN PROCESO
		* FINALIZADO 
		* CANCELADO
Entidades
	- Claim:
		* id
		* nombre
		* descripcion
		* fechaInicio
		* fechaFin
		* estadoReclamo
		* usuarioId
		* relacion con tipoReclamo
		* resolución (boolean)
	- ClaimType:
		* id
		* nombre
		* descripcion
		* fechaBaja
Enumeraciones:
	- ClaimState:
		* nombre
