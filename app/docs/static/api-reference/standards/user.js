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

 */