var app = app || {};

var TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new Backbone.LocalStorage("SomeCollection"),
  
  completed: function(){
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function( todo ) {
    return todo.get('order');
  }
});

app.Todos = new TodoList();
app.Todos.add([{title: 'todo 1', completed: false, id: 1},
               {title: 'todo 2', completed: true, id: 2},
               {title: 'todo 3', completed: true, id: 3}]);
