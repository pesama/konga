// ## Generation

// Metadata objects are generated into a `json` object, and injected into Konga at startup. Injection method is free - as long as Konga has a metadata object stored once you try to interact with it. You can directly inject it via a `constant` or a `value`, you can retrieve it via `$http` (or any factory for that purpose), store it on `localStorage`, send it over a socket... Pick what you like. 

// Metadata objects are easily understandable, yet tedious to be written. To overcome this and keep your eyes, you can use a metadata generator.



// ### Java Annotations

// Currently the only working (and throuroughy tested) generator consists in a group of Java annotations, that let you create a full Konga metadata definition right into Java POJOs. Then you can use the built-in generator to get the json object to inject.

// For Java backend systems works like a charm. You can either get the file and store it on your ui, or provide a `/api/metadata` endpoint to get the file using a service, and save you the moving time. Injection method is fully your choice.


 

// We are working on more ways to generate your metadata. If you have done one that does the trick and want to share it, fork this docs and improve them!