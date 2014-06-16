(function(root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('backbone'), require('react'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'react', 'underscore'], factory);
    } else {
        // Browser globals
        root.amdWeb = factory(root.Backbone, root.React, root._);
    }
}(this, function(Backbone, React, _) {

    'use strict';

    var collectionBehavior = {
        changeOptions: 'add remove reset sort',
        updateScheduler: function(func) { return _.debounce(func, 0); }
    };

    var modelBehavior = {
        changeOptions: 'change',
        //note: if we debounce models too we can no longer use model attributes
        //as properties to react controlled components due to https://github.com/facebook/react/issues/955
        updateScheduler: _.identity
    };

    var subscribe = function(component, modelOrCollection, customChangeOptions) {
        if (!modelOrCollection) {
            return;
        }

        var behavior = modelOrCollection instanceof Backbone.Collection ? collectionBehavior : modelBehavior;

        var triggerUpdate = behavior.updateScheduler(function() {
            if (component.isMounted()) {
                (component.onModelChange || component.forceUpdate).call(component);
            }
        });

        var changeOptions = customChangeOptions || component.changeOptions || behavior.changeOptions;
        modelOrCollection.on(changeOptions, triggerUpdate, component);
    };

    var unsubscribe = function(component, modelOrCollection) {
        if (!modelOrCollection) {
            return;
        }

        modelOrCollection.off(null, null, component);
    };

    React.BackboneMixin = function(propName, customChangeOptions) {
      return {
        componentDidMount: function() {
            // Whenever there may be a change in the Backbone data, trigger a reconcile.
            subscribe(this, this.props[propName], customChangeOptions);
        },

        componentWillReceiveProps: function(nextProps) {
            if (this.props[propName] === nextProps[propName]) {
                return;
            }

            unsubscribe(this, this.props[propName]);
            subscribe(this, nextProps[propName], customChangeOptions);

            if (typeof this.componentWillChangeModel === 'function') {
                this.componentWillChangeModel();
            }
        },

        componentDidUpdate: function(prevProps, prevState) {
            if (this.props[propName] === prevProps[propName]) {
                return;
            }

            if (typeof this.componentDidChangeModel === 'function') {
                this.componentDidChangeModel();
            }
        },

        componentWillUnmount: function() {
            // Ensure that we clean up any dangling references when the component is destroyed.
            unsubscribe(this, this.props[propName]);
        }
      };
    };

    React.BackboneViewMixin = {
        getModel: function() {
            return this.props.model;
        },

        model: function() {
            return this.getModel();
        },

        getCollection: function() {
            return this.props.collection;
        },

        collection: function() {
            return this.getCollection();
        },

        el: function() {
            return this.isMounted() && this.getDOMNode();
        }
    };

    React.createBackboneClass = function(spec) {
        var currentMixins = spec.mixins || [];

        spec.mixins = currentMixins.concat([
            React.BackboneMixin('model'),
            React.BackboneMixin('collection'),
            React.BackboneViewMixin
        ]);

        return React.createClass(spec);
    };

    return React;
}));