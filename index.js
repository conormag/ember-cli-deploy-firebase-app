/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
'use strict';

var BasePlugin = require('ember-cli-deploy-plugin');
var firebaseTools = require('firebase-tools');

module.exports = {
  name: 'ember-cli-deploy-firebase-app',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      runBefore: ['slack'],

      requiredConfig: ['project', 'token', 'public'],

      defaultConfig: {
        force: true,

        message: function(context) {
          return (context.revisionData || {}).revisionKey;
        },
        public: function(context) {
          return context.config.build.outputPath;
        },
        project: function(context) {
          return context.config.firebase.projectId;
        },
        token: function(context) {
          return context.config.firebase.deployToken;
        }
      },

      upload: function(context) {
        var outer = this;

        var options = {
          project: this.readConfig('project'),
          public: this.readConfig('public'),
          message: this.readConfig('message'),
          force: this.readConfig('force'),
          token: this.readConfig('token'),
          verbose: context.ui.verbose
        };

        var deployOnly = this.readConfig('only');
        var deployExcept = this.readConfig('except');

        if (deployOnly) options.only = deployOnly;
        if (deployExcept) options.except = deployExcept;

        this.log(`firebase-tools will receive options: ${JSON.stringify(options)}`, {verbose: true});

        return firebaseTools.deploy(options).then(function() {
          outer.log('successful deploy!', {verbose: true});
          return {
            firebaseProject: options.project
          }
        }).catch(function(err) {
          // handle error
          outer.log('Error in ember-cli-deploy-firebase-app', { color: 'red' });
          outer.log(err, { color: 'red' });
          outer.log(err.stack, { color: 'red' });
        });
      },

    });
    return new DeployPlugin();
  }
};