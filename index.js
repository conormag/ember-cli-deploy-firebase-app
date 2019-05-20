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

      defaultConfig: {
        useDeployTarget: false
      },

      upload: function(context) {
        var outer = this;

        var useDeployTarget = this.readConfig('useDeployTarget');
        var project = useDeployTarget ? 
          context.deployTarget : 
          this.readConfig('appName') || context.config.firebase.projectId;

        var options = {
          project: project,
          public: context.config.build.outputPath,
          message: (context.revisionData || {}).revisionKey,
          verbose: context.ui.verbose
        };
        
        if (context.config.firebase.deployToken || process.env.FIREBASE_TOKEN) {
          options.token = context.config.firebase.deployToken || process.env.FIREBASE_TOKEN;
        }

        return firebaseTools.deploy(options).then(function() {
          outer.log('successful deploy!', {verbose: true});
          return {
            firebaseProject: project
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