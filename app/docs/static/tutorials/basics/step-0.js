/**
 * @ngdoc object
 * @name Basics.0 - Preparation
 * @description
 * 
 * # Step 1: Preparation
 *
 * Welcome to `Konga Basics` _101_. On this step we will create the `metadata` and `ui` projects, ready to be served. On this step we won't develop any functionality, we will just create the projects using all the tools needed, and let the next steps do the rest. 
 *
 * 
 * ## Downloading the projects
 *
 * You can build your projects from scratch. However, for the sake of this tutorial, you can download the code from the {@link https://github.com/pritok/konga-tutorial-basics.git `tutorial repository`}, fetching the source of the branch `step-1`.
 *
 * On a terminal, go to your project path - created in the {@link Basics introduction} - and type this:
 ```
 git checkout -f step-0
 ```
 *
 *
 * Under your project structure you will see many folders. One `metadata` folder, that contains the {@link https://github.com/pritok/konga-metadata `konga-metadata`} project to start creating your models, and the other folders contain a brand new - scaffolded with {@link http://yeoman.io/ `Yeoman`} - Angular application, with `konga` as `bower dependency`. All the code for the app is under `/app`.
 *
 * <img src="http://static.konga.io/konga-tutorial-basics-step1-folders.png" width="30%" class="center">
 *
 * ## Install dependencies
 *
 * For successfully running the app, you need to install `Maven` dependencies to your metadata project, and `npm` and `bower` dependencies for the ui.
 *
 * * **`Maven dependencies`:**
 * ```
 cd metadata
 mvn clean install
 * ```
 * * **`NPM and bower dependencies`:**
 * ```
 cd ../ # You need to be at the root of the project
 npm install
 bower install
 * ```
 *
 * If these installation steps finish ok, you will be able to launch your app by typing:
 *
 * ```
 grunt serve
 * ```
 *
 * And your app will launch at `http://localhost:9000`.
 *
 * ## Your application
 *
 * The app you just launched is merely the {@link http://yeoman.io `Yeoman`} scaffolding - using {@link https://github.com/yeoman/generator-angular#readme `Angular generator`} - and a further command `bower install --save konga` to include `konga` as a bower dependency. 
 *
 * This is the appeareance of your app right now:
 *
 * <img src="http://static.konga.io/konga-tutorial-basics-boilerplate.png" width="40%" class="center">
 * 
 * ## Next step
 *
 * Now that we have our app running, it's time to define some metadata. **{@link Basics.1%20-%20Application%20Basic%20Metadata Go to the next step}**.
 * 
 * 
 */