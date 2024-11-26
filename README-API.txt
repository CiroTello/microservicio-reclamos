------------------------------------------------------
POST /v1/claims 

*Resumen*:
CU: Realizar reclamo (Usuario cliente)

*Parámetros*: 
Name			Located in	Description		Required	Schema
Authorization	header	 {token}		Yes		string
type			body		Entity claim	Yes		claim.Claim

*Respuestas*:
Code	Description			Schema
200	Claim  			claim.Claim
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
PUT /v1/claims/{claimId}

*Resumen*:
CU: Cancelar reclamo (Usuario cliente)
CU: Cancelar reclamo (Usuario admin)
CU: Resolver reclamo (Usuario admin)
CU: Procesar reclamo (Usuario admin)

*Parámetros*: 
Name			Located in	Description	Required	Schema
Authorization	header	Bearer {token}	Yes		string
claimId		path		Claim id	Yes		string
type			body		State		Yes		string

*Respuestas*:
Code	Description			Schema
200	Claim				claim.Claim
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
GET /v1/claims/{claimId}

*Resumen*:
CU: Ver reclamos con sus estados (Usuario cliente)
CU: Ver reclamos con sus estados (Usuario admin)

*Parámetros*: 
Name			Located in	Description		Required	Schema
Authorization	header	Bearer {token}	Yes		string
claimId		path		Claim id		Yes		string

*Respuestas*:
Code	Description			Schema
200	Claim				claim.Claim		
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
GET /v1/claims

*Resumen*:
CU: Ver reclamos con sus estados (Usuario cliente)
CU: Ver reclamos con sus estados (Usuario admin)

*Parámetros*: 
Name			Located in		Description		Required	Schema
Authorization	header		Bearer {token}	Yes		string

*Respuestas*:
Code	Description			Schema
200	Claims 			listOf(claim.Claim)
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
GET /v1/claim-types

*Resumen*:
CU: Ver tipos de reclamos

*Parámetros*: 
Name			Located in		Description		Required	Schema
Authorization	header		Bearer {token}	Yes		string

*Respuestas*:
Code	Description			Schema
200	Claim types			listOf(claim.ClaimType)
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
POST /v1/claim-types

*Resumen*:
CU: Crear tipo reclamo (Usuario admin)

*Parámetros*: 
Name			Located in	Description		Required	Schema
Authorization	header	Bearer {token}	Yes		string
type			body		ClaimType		Yes		claim.ClaimType

*Respuestas*:
Code	Description			Schema
200	Claim type			claim.ClaimType
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------
DELETE /v1/claim-types/{claimTypeId}

*Resumen*:
CU: Crear tipo reclamo (Usuario admin)

*Parámetros*: 
Name			Located in	Description		Required	Schema
Authorization	header	Bearer {token}	Yes		string
claimTypeId		path		Claim type id	Yes		string
type			body		ClaimType		Yes		claim.ClaimType

*Respuestas*:
Code	Description			Schema
200	No Content		
400	Bad Request			errs.ValidationErr
401	Unauthorized		server.ErrorData
404	Not Found			server.ErrorData
500	Internal Server Error	server.ErrorData

------------------------------------------------------

Models:
claim.Claim:
	* id
	* nombre
	* descripcion
	* fechaInicio
	* fechaFin
	* estadoReclamo
	* usuarioId
	* relacion con tipoReclamo
	* resolución (boolean)
claim.ClaimType: 
	* id
	* nombre
	* descripcion
	* fechaBaja


States:
	* CREADO
	* EN PROCESO
	* FINALIZADO 
	* CANCELADO
