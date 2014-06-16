var app = app || {};

app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    id: null
  },

  toggle: function(){
    this.save({
      completed: !this.get('completed')
    });
  }
});
