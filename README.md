<div align="center">
<h1>Moodle Migrator Service</h1>

<a href="https://iconos8.es/icons/set/moodle">
  <img
    height="80"
    width="80"
    src="https://geografiaehistoria.ucm.es/file/moodle-icon/?ver"
  />
</a>

<p>
Service that is used to migrate from an existing Moodle-type virtual campus; or create a new course that includes all the Moodle elements that we need in the new course.
</p>


[**Read The Docs**](https://docs.moodle.org/402/en/Main_page)
</div>

## Table of Contents

<!-- DON'T EDIT THIS SECTION -->

- [Table of Contents](#table-of-contents)
- [The problem](#the-problem)
- [The solution](#the-solution)
- [Installation](#installation)
- [Docs](#docs)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors](#contributors)
- [LICENSE](#license)

## The problem

Moodle currently has a tool to migrate a course from one campus to another but it does not allow you to select which elements to migrate nor does it allow you to modify them in the process, so if any changes need to be made to these files, they would have to be done later by hand. On the other hand, Moodle also does not allow you to create a course from scratch with a predefined template.

## The solution

The `Unisync Service (Moodle Migrator Service)` is a very useful product when solving these problems. With this service you can migrate courses in a personalized way from one campus to another as well as create a new course from a specific skeleton or structure.
All types of mod elements that are within a course can be included

## Installation

This service is built with node and express. And to run it you only need to configure the following environment variables in the path `/.env`:

<div align="center">

Name              | Default           | Description
------------------|-------------------|------------
APP_PORT          | 4000              | The port the app will run on
SERVICE_APP_NAME  | 'unisync-service' | The name of the service
DB_HOST           | 'localhost'       | MongoDB host
DB_PORT           | 27017             | MongoDB port
DB_NAME           | 'unisync-service' | MongoDB name of the database
DB_USERNAME       | ''                | MongoDB username
DB_PASSWORD       | ''                | MongoDB password
DOMAIN_ALLOW      | 'localhost'       | Domain that will be allowed to make requests to the service
CRYPTO_KEY        | ''                | The key to encrypt the passwords
JWT_EXPIRES_IN    | '3h'              | The time that the JWT will be valid
JWT_SECRET        | ''                | The secret to sign the JWT

</div>

Then run the following command:
```
npm start
```
If you want to deploy the application in a Docker container, run the following command:
```
```

## Docs

[**Read The Docs**](https://docs.moodle.org/402/en/Main_page)

## Issues

Looking to contribute? Look for the label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/didactika/unisync-service/issues)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**](https://github.com/didactika/unisync-service/issues)

## Contributors

Thanks goes to these people:

<!-- Do not remove or modify this section -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hector-ae21"><img src="https://avatars.githubusercontent.com/u/87265357?v=4" width="100px;" alt="Hector L. Arrechea"/><br /><sub><b>Hector L. Arrechea</b></sub></a><br /><a title="Code">💻</a> <a title="Documentation">📖</a> <a title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/E2RD0"><img src="https://avatars.githubusercontent.com/u/20119863?v=4" width="100px;" alt="Eduardo Estrada"/><br /><sub><b>Eduardo Estrada</b></sub></a><br /><a title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eirik-rosete"><img src="https://avatars.githubusercontent.com/u/145449142?v=4" width="100px;" alt="Eirik A. Rosete"/><br /><sub><b>Eirik Rosete</b></sub></a><br /><a title="Code">💻</a></td>
    </tr>

      

  </tbody>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->


## LICENSE

[MIT](LICENSE)
