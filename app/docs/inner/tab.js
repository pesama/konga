/*
 * @ngdoc object
 * @name Action-driven framework.Tab
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
 */

/*
 * @ngdoc object
 * @name id
 * @propertyOf Action-driven framework.Tab
 * @type String
 * @description
 * <b>String</b> with a unique name for the tab. This field identifies the tab on the system.
 */

/*
 * @ngdoc object
 * @name title
 * @propertyOf Action-driven framework.Tab
 * @description
 * <b>String</b> with the title of the tab. If a placeholder is given, the translation will be shown instead.
 */

/*
 * @ngdoc object
 * @name href
 * @propertyOf Action-driven framework.Tab
 * @description
 * <b>String</b> the link for the tab. This is for the navigation bar, to maintain history
 */

/*
 * @ngdoc object
 * @name closable
 * @propertyOf Action-driven framework.Tab
 * @description
 * <b>Boolean</b> that indicates whether the tab could be closed.
 */

/*
 * @ngdoc object
 * @name type
 * @propertyOf Action-driven framework.Tab
 * @description
 * <b>String</b> with a unique name for the tab. This field identifies the tab on the system.
 */