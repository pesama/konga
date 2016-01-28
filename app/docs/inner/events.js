/*
 * @ngdoc object
 * @name Events
 * @description
 * Events triggered on Konga's application flow.
 */

/*
 * @ngdoc object
 * @name Events.locale-change
 * @description
 * 
 * Event triggered when changing language on konga.
 * The event contains information of both the old language, and the new one.
 * This event is called from the `$rootScope`, so every controller could catch it.
<pre>
{
	'old': 'es-ES',
	'new': 'en-US' 
}
</pre>
 */