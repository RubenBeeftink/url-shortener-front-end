# ShortenerFrontEnd
This application aims to provide a front-end implementation for creating shortened urls. It builds upon the api provided in the back-end project. (https://github.com/RubenBeeftink/url-shortener-back-end)

This project runs angular version 18.2.5. It is a basic web application. It provides the following functionality:
- ability to register a user
- ability to login as a user
- ability to view all short urls belonging to a user
- ability to create a new short url
- ability to update an existing short url
- ability to delete a short url

The project uses standalone angular components and follows the most recent best practises in angular projects as of the date of building this project.

For those unfamiliar with the angular folder structure:

All application logic is housed in the `src/app` folder.
- the `components` folder contains global, resuable components.
- the `interceptors` folder contains `HttpInterceptors`, used by Angular's `HttpClient`. These interceptors are used to alter an outgoing HttpRequest.
- the `interfaces` folder contains interfaces. Usually these represent back-end database models.
- the `pages` folder contains all `pages` that the application contains, such as `short-url/detail`, `short-url/index`.
- the `services` folder contains services for interacting with the back-end api.
- the `validators` folder contains custom form-validators.

Each page has it's own html template and corresponding angular/ts javascript file.

## Running the project
Requirements:
- node
- npm

Install the dependencies:
- `npm install`

To run the project:

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. 
Make sure that the back-end is running on `http://localhost:8000`, or alter the `baseUrl` in `login.service.ts` and `short-url.service.ts` to the corresponding back-end url.

- Run the back-end project according to the [readme](https://github.com/RubenBeeftink/url-shortener-back-end/blob/main/README.md) in the repository.
