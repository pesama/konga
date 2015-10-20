"use strict";

 angular.module('config', [])

.constant('i18n', {es:{'message.login.title':'Acceso a la aplicación','message.login.description':'Introduzca sus datos de acceso para utilizar la aplicación','message.login.username':'Correo electrónico','message.login.password':'Contraseña','message.login.rememberme':'Recordarme en este equipo','message.login.proceed':'Acceder','message.login.incorrect-data':'Usuario o contraseña inválidos','message.action.validate':'Validar','message.action.save':'Guardar','message.action.cancel':'Cancelar','message.action.add':'Añadir','message.action.delete':'Eliminar','message.action.clean':'Limpiar','message.action.search':'Buscar','message.action.close':'Cerrar','message.action.proceed-order':'Pedido','message.discard-changes.title':'Confirma tu acción','message.discard-changes.message':'¿Deseas cancelar tus cambios?','message.delete-entity.title':'Confirma tu acción','message.delete-entity.message':'¿Deseas eliminar este elemento?','message.action-confirmation.create.success':'Elemento creato con éxito','message.action-confirmation.update.success':'Elemento actualizado con éxito','message.action-confirmation.delete.success':'Elemento borrado con éxito','message.search-filters.title':'Filtros de búsqueda','message.field-validation.required':'Este campo es obligatorio','message.boolean.yes':'Sí','message.boolean.no':'No',DIALOGS_YES:'Sí',DIALOGS_NO:'No',DIALOGS_CLOSE:'Cerrar','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Buscar {{ label }}','message.tabs.entity.update':'Actualizar {{ label }} {{ id }}','message.tabs.entity.create':'Crear {{ label }}','message.menu.entity-management':'Gestionar elementos','message.menu-internal-news':'Mensajes internos','field.searchResults.noresults':'Sin resultados','panel.admin-options.title':'Opciones de administración','panel.admin-options.control-panel':'Administración','panel.admin-options.sales-panel':'Comercial','panel.select-store.title':'Selecciona tu tienda','field.date-search.comparator':'Comparador','field.date-search.date':'Fecha','field.date-search.otherdate':'Otra fecha','field.date-search.LOWER_THAN':'Anterior','field.date-search.LOWER_EQUALS':'Anterior o igual','field.date-search.EQUALS':'Igual','field.date-search.GREATER_EQUALS':'Posterior o igual','field.date-search.GREATER_THAN':'Posterior','field.date-search.BETWEEN':'Entre','field.number-range.comparator':'Comparador','field.number-range.number':'Valor','field.number-range.othernumber':'Otro valor','field.number-range.LOWER_THAN':'Menor','field.number-range.LOWER_EQUALS':'Menor o igual','field.number-range.EQUALS':'Igual','field.number-range.GREATER_EQUALS':'Mayor o igual','field.number-range.GREATER_THAN':'Mayor','field.number-range.BETWEEN':'Entre','message.table-input.not-yet-configured':'La tabla aún no ha sido configurada','field.list-input.actions':'Acciones','field.file-input.upload':'Seleccionar archivo','message.pagination.results-per-page':'Resultados por página','message.pagination.results':'Mostrando  resultados {{ (offset-1) * limit + 1 }} a {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} de {{ count }} ','message.single-select.title':'Elija un elemento','combobox.placeholder':'Seleccionar un valor',DUPLICATED_ELEMENT:'Error de integridad: Ese elemento ya existe','entity.catalog-product-details.cart.add.success':'{{ product.description }} añadido al carrito','entity.catalog-product-details.cart.edit.success':'{{ product.description }} editado con éxito','entity.catalog-product-details.cart.add.no-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.not-enough-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.from-total-stock':'Este producto pertenece a un almacén externo a Storpanel, y puede estar fuera de su embalaje original.'},en:{'message.login.title':'Acceso a la aplicación','message.login.description':'Introduzca sus datos de acceso para utilizar la aplicación','message.login.username':'Correo electrónico','message.login.password':'Contraseña','message.login.rememberme':'Recordarme en este equipo','message.login.proceed':'Acceder','message.login.incorrect-data':'Usuario o contraseña inválidos','message.action.validate':'Validar','message.action.save':'Guardar','message.action.cancel':'Cancelar','message.action.add':'Añadir','message.action.delete':'Eliminar','message.action.clean':'Limpiar','message.action.search':'Buscar','message.action.close':'Cerrar','message.action.proceed-order':'Pedido','message.discard-changes.title':'Confirma tu acción','message.discard-changes.message':'¿Deseas cancelar tus cambios?','message.delete-entity.title':'Confirma tu acción','message.delete-entity.message':'¿Deseas eliminar este elemento?','message.action-confirmation.create.success':'Elemento creato con éxito','message.action-confirmation.update.success':'Elemento actualizado con éxito','message.action-confirmation.delete.success':'Elemento borrado con éxito','message.search-filters.title':'Filtros de búsqueda','message.field-validation.required':'Este campo es obligatorio','message.boolean.yes':'Sí','message.boolean.no':'No',DIALOGS_YES:'Sí',DIALOGS_NO:'No',DIALOGS_CLOSE:'Cerrar','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Buscar {{ label }}','message.tabs.entity.update':'Actualizar {{ label }} {{ id }}','message.tabs.entity.create':'Crear {{ label }}','message.menu.entity-management':'Gestionar elementos','message.menu-internal-news':'Mensajes internos','field.searchResults.noresults':'Sin resultados','panel.admin-options.title':'Opciones de administración','panel.admin-options.control-panel':'Administración','panel.admin-options.sales-panel':'Comercial','panel.select-store.title':'Selecciona tu tienda','field.date-search.comparator':'Comparador','field.date-search.date':'Fecha','field.date-search.otherdate':'Otra fecha','field.date-search.LOWER_THAN':'Anterior','field.date-search.LOWER_EQUALS':'Anterior o igual','field.date-search.EQUALS':'Igual','field.date-search.GREATER_EQUALS':'Posterior o igual','field.date-search.GREATER_THAN':'Posterior','field.date-search.BETWEEN':'Entre','field.number-range.comparator':'Comparador','field.number-range.number':'Valor','field.number-range.othernumber':'Otro valor','field.number-range.LOWER_THAN':'Menor','field.number-range.LOWER_EQUALS':'Menor o igual','field.number-range.EQUALS':'Igual','field.number-range.GREATER_EQUALS':'Mayor o igual','field.number-range.GREATER_THAN':'Mayor','field.number-range.BETWEEN':'Entre','message.table-input.not-yet-configured':'La tabla aún no ha sido configurada','field.list-input.actions':'Acciones','field.file-input.upload':'Seleccionar archivo','message.pagination.results-per-page':'Resultados por página','message.pagination.results':'Mostrando  resultados {{ (offset-1) * limit + 1 }} a {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} de {{ count }} ','message.single-select.title':'Elija un elemento','combobox.placeholder':'Seleccionar un valor',DUPLICATED_ELEMENT:'Error de integridad: Ese elemento ya existe','entity.catalog-product-details.cart.add.success':'{{ product.description }} añadido al carrito','entity.catalog-product-details.cart.edit.success':'{{ product.description }} editado con éxito','entity.catalog-product-details.cart.add.no-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.not-enough-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.from-total-stock':'Este producto pertenece a un almacén externo a Storpanel, y puede estar fuera de su embalaje original.'},fr:{'message.login.title':'Acceso a la aplicación','message.login.description':'Introduzca sus datos de acceso para utilizar la aplicación','message.login.username':'Correo electrónico','message.login.password':'Contraseña','message.login.rememberme':'Recordarme en este equipo','message.login.proceed':'Acceder','message.login.incorrect-data':'Usuario o contraseña inválidos','message.action.validate':'Validar','message.action.save':'Guardar','message.action.cancel':'Cancelar','message.action.add':'Añadir','message.action.delete':'Eliminar','message.action.clean':'Limpiar','message.action.search':'Buscar','message.action.close':'Cerrar','message.action.proceed-order':'Pedido','message.discard-changes.title':'Confirma tu acción','message.discard-changes.message':'¿Deseas cancelar tus cambios?','message.delete-entity.title':'Confirma tu acción','message.delete-entity.message':'¿Deseas eliminar este elemento?','message.action-confirmation.create.success':'Elemento creato con éxito','message.action-confirmation.update.success':'Elemento actualizado con éxito','message.action-confirmation.delete.success':'Elemento borrado con éxito','message.search-filters.title':'Filtros de búsqueda','message.field-validation.required':'Este campo es obligatorio','message.boolean.yes':'Sí','message.boolean.no':'No',DIALOGS_YES:'Sí',DIALOGS_NO:'No',DIALOGS_CLOSE:'Cerrar','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Buscar {{ label }}','message.tabs.entity.update':'Actualizar {{ label }} {{ id }}','message.tabs.entity.create':'Crear {{ label }}','message.menu.entity-management':'Gestionar elementos','message.menu-internal-news':'Mensajes internos','field.searchResults.noresults':'Sin resultados','panel.admin-options.title':'Opciones de administración','panel.admin-options.control-panel':'Administración','panel.admin-options.sales-panel':'Comercial','panel.select-store.title':'Selecciona tu tienda','field.date-search.comparator':'Comparador','field.date-search.date':'Fecha','field.date-search.otherdate':'Otra fecha','field.date-search.LOWER_THAN':'Anterior','field.date-search.LOWER_EQUALS':'Anterior o igual','field.date-search.EQUALS':'Igual','field.date-search.GREATER_EQUALS':'Posterior o igual','field.date-search.GREATER_THAN':'Posterior','field.date-search.BETWEEN':'Entre','field.number-range.comparator':'Comparador','field.number-range.number':'Valor','field.number-range.othernumber':'Otro valor','field.number-range.LOWER_THAN':'Menor','field.number-range.LOWER_EQUALS':'Menor o igual','field.number-range.EQUALS':'Igual','field.number-range.GREATER_EQUALS':'Mayor o igual','field.number-range.GREATER_THAN':'Mayor','field.number-range.BETWEEN':'Entre','message.table-input.not-yet-configured':'La tabla aún no ha sido configurada','field.list-input.actions':'Acciones','field.file-input.upload':'Seleccionar archivo','message.pagination.results-per-page':'Resultados por página','message.pagination.results':'Mostrando  resultados {{ (offset-1) * limit + 1 }} a {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} de {{ count }} ','message.single-select.title':'Elija un elemento','combobox.placeholder':'Seleccionar un valor',DUPLICATED_ELEMENT:'Error de integridad: Ese elemento ya existe','entity.catalog-product-details.cart.add.success':'{{ product.description }} añadido al carrito','entity.catalog-product-details.cart.edit.success':'{{ product.description }} editado con éxito','entity.catalog-product-details.cart.add.no-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.not-enough-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.from-total-stock':'Este producto pertenece a un almacén externo a Storpanel, y puede estar fuera de su embalaje original.'}})

;