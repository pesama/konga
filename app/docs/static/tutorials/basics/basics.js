/**
 * @ngdoc overview
 * @name Basics
 * @description 
 *
 * # Konga basics
 *
 * `Konga basics` tutorial is the first tutorial of Konga learning series. It's main purpose is get you up and running with Konga. 
 *
 * # The `mini` cloud console
 *
 * In this tutorial we will cover the creation of a `mini` cloud console. We will craft rich forms and interactions for `Organisations`, `Applications` and `Developers`.
 *
 * <img src="http://static.konga.io/tutorial-basics-datamodel.png" width="40%" class="center">
 *
 * * **Organisations:** An organisation represents a company - or any other sort of group association - that wants to build and deploy apps within our cloud.
 *
 * * **Applications:** An application is a project that runs in our cloud, always owned by one organisation.
 *
 * * **Developers:** Developers are the guys responsible for bringing to life the organisation ideas, converting them into apps and deploying them within our cloud.
 *
 * ## Relationships
 *
 * `Organisations` have direct access to the `Applications` deployed and the `Developers` who deployed them. `Developers` own the applications they created, and the `Applications` store a property with all the `Developers` who worked on it.
 *
 * 
 * # Create the projects
 *
 * We need to create the project to generate the metadata for this system. We will use {@link https://github.com/pritok/konga-metadata `konga-metadata`} generator for Java to generate the metadata from our data model. And we need the project with the `ui`.
 *
 * You can download both projects altogether using the {@link https://github.com/pritok/konga-tutorial-basics.git `tutorial repository`}. 
 *
 * **Clone with git:**
 * ```
 * git clone https://github.com/pritok/konga-tutorial-basics.git
 * ```
 *
 * This will create a `konga-tutorial-basics` folder, with the full functionality covered by this tutorial. It's everything ready to work once you installed dependencies:
 * ```
 * npm install
 * bower install
 * ```
 * 
 * Then you can launch the app by typing:
 * ```
 * grunt serve
 * ```
 * 
 * Your browser will autommatically open at `http://localhost:9010` with your app working.
 *
 *
 * # Next steps
 *
 * Now that you have your project created, it's time to create the {@link }
 * 
 */

 /**
 * @ngdoc overview
 * @name NotThatBasics
 * @description 
 */