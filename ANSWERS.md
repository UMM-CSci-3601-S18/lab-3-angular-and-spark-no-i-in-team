1. There's a gitignore in floating in the project, a gitignore
in the client folder, and another in the server folder. It looks 
like there are more than one so that there can be exceptions to general
rules like ignoring all jar files, and the gitignore files are located
close to where the file is

2. There's one gradle for the client's dependencies, one for the server's,
and one for the entire project that only depends on the server and client.
I'm guessing it allows the client and server to be separate.

3. The app.component.html file contains the code for the menu and all
the stuff that is shared between pages. When the user navigates to 
another page, it adds the stuff that is unique to the page into the 
router-outlet element.

4. The service is the code that makes requests to the server. Since it
is separate from the component, that allows there to be multiple 
components that reuse the same service.
