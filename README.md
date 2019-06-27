ember-cli-deploy-firebase-app
==============================================================================
<img src="https://travis-ci.com/conormag/ember-cli-deploy-firebase-app.svg?branch=master">

[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-deploy-firebase-app.svg)](https://emberobserver.com/addons/ember-cli-deploy-firebase-app)

ember-cli-deploy plugin for deplying an Ember app to firebase.



Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-deploy-firebase-app
```


Usage
------------------------------------------------------------------------------

Specify your options in `config/deploy.js`

```
  ENV['firebase-app'] = {
    project: 'firebaseProjectId',
    token: process.env.FIREBASE_TOKEN,
  };
```

Options are:

|Option|Default|required|Notes|
|------|------|------|-------------|
|project|firebase.projectId|required|If not specified will default to reading `ENV.firebase.projectId` in `config/environment.js` |
|token|firebase.deployToken|required|If not specified will default to reading `ENV.firebase.deployToken` in `config/environment.js`|
|public|build.outputPath|optional| will default to use the build.outputPath in ember-cli-deploy pipeline. This shouldn't need to be changed.|
|message|revisionData.revisionKey|optional|by default, looks for the revision data ember-cli-deploy-revision-data. Or specify your own message.|
|only|NA|optional|[equivalent to firebase deploy --only param](https://firebase.google.com/docs/cli#partial_deploys)|
|except|nA|optional|equivalent to `only` but reversed outcome|




Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
