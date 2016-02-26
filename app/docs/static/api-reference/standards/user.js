/**
 * @ngdoc object
 * @name Standards.User
 * @description 

Konga stores basic user information. It mainly uses it to match permissions against the operations the user tries to perform, although you can extend the user information on any fashion you want (useful for private apps).

User management is achieved thanks to a {@link konga.userData `userData`} value, who stores the information you provide about the user.

# Role management

If your application deals with permission-based forms (i.e. you have appended permissions to your entities and fields), you might need to let Konga know about user's roles - otherwise the restricted functionalities will be restricted to everyone. 

Konga comes with an empty array as the {@link konga.userData#properties_roles user's roles}. To append some role you can do as follows:

<pre>
angular.module('myAwesomeApp')
  .run('LoginController', ['userData', 'myUserRoles', function(userData, myUserRoles) {
    userData.roles = myUserRoles;
  }]);
</pre>

You can append your role initialisation anywhere you want, but until you don't do this permissions won't be ready, and thus all restricted operations won't be available.

# Custom parameters

{@link konga.userData `userData`} value is essentially a plain `js` object. Therefore you can append any property, method, or any other utility you want or need to handle users properly in your app.

## `access_token`

On private APIs that need OAuth2 authentication for accessing it, `userData` becomes useful to store the token to access it on your request interceptor to inject it into API calls. 

## Basic information

If you are dealing with a private app, that uses user information for anything, `userData` will be handy too. You can simply store the user information you need to use, and it will be available for you anywhere.



 */