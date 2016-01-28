/**
 * @ngdoc object
 * @name Actions.Tab
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
	type: constants.TAB_TYPE_UPDATE
}
</pre>
 */

/**
 * @ngdoc object
 * @name id
 * @propertyOf Actions.Tab
 * @type String
 * @description
 * <b>String</b> with a unique name for the tab. This field identifies the tab on the system.
 */

/**
 * @ngdoc object
 * @name title
 * @propertyOf Actions.Tab
 * @description
 * <b>String</b> with the title of the tab. If a placeholder is given, the translation will be shown instead.
 */

/**
 * @ngdoc object
 * @name href
 * @propertyOf Actions.Tab
 * @description
 * <b>String</b> the link for the tab. This is for the navigation bar, to maintain history
 */

/**
 * @ngdoc object
 * @name closable
 * @propertyOf Actions.Tab
 * @description
 * <b>Boolean</b> that indicates whether the tab could be closed.
 */

/**
 * @ngdoc object
 * @name type
 * @propertyOf Actions.Tab
 * @description
 * <b>String</b> with a unique name for the tab. This field identifies the tab on the system.
 */