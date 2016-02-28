/**
 * @ngdoc function
 * @methodOf Standards.Actions
 * @name Tab
 * @description
 * This object defines the configuration of a tab in Konga.
 * 
 * An example of a tab definition would be:
<pre>
{
	id : 'my-custom-tab', 
	title : 'Custom tab!', 
	href : '/custom/tab/1',
	closable : true,
	type: util.constants.TAB_TYPE_UPDATE
}
</pre>

@param {string} id
 * Unique `id` for the tab. When a tab tries to open, this parameter is verified for existence in the {@link konga.controller:KongaController#properties_tabs `tab stack`}, and if there is anyone with it, it's brought to front instead of reopening.
 *
 * # Reserved names
 *
 * Konga standards open tabs for entity searching and updating. The tabs opened for these purposes will have standard ids, which you should never override unless you are completely aware of what you are doing:
 *
 * * **`entity_` + _entityName_ + `_search`:** Search tab for `entityName` entities.
 * * **`entity_` + _entityName_ + `_update_` + _entityId_:** Update tab for the `entityName` entity identified with `entityId` id. For `creating` mode, the `entityId` value will be '`new`'.

@param {string=} title
 * Title for the tab. The title - its translation - is used to render in the tab header present on `tabbed` {@link Metadata.ConfigurationParam#properties_LOOK_AND_FEEL `look&feel`}. On other modes you can use this value in your custom code.

@param {string} href
 * Route for the tab. This value is used to map the app location with the opened tabs, to allow users to go back and forth, and to access tabs via links.

@param {boolean=} closable
 * Defines whether the tab would by closed by user. This is used on `tabbed` {@link Metadata.ConfigurationParam#properties_LOOK_AND_FEEL `look&feel`}, rendering a `close` icon o the tab header.

@param {string=} type
 * Define the typology of the tab. Actually is a css class, that is applied to an `<i>` element before tab's title, for apps using `tabbed` {@link Metadata.ConfigurationParam#properties_LOOK_AND_FEEL `look&feel`}.
 */