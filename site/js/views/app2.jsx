var AppView = React.createBackboneClass({
  toggleAllComplete: function(){
    var completed = !this.refs.toggleAllCheckbox.state.checked;
    app.Todos.each(function(todo){
      todo.save({'completed': completed});
    });
  },
  
  addTodo: function(e){
    if(e.keyCode === 13){   // ENTER KEY
      var title = this.refs.new_todo.getDOMNode().value.trim();
      app.Todos.add({title: title, completed: false});
      this.refs.new_todo.getDOMNode().value = '';
    }
  },
  
  render: function(){
    var todos = this.getCollection().map(function(todo){
      return <TodoView model={todo} />
    });

    return (
      <section id="todoapp">
      <header id="header">
      <h1>todos</h1>
      <input id="new-todo" placeholder="What needs to be done?" autofocus
      onKeyPress={this.addTodo} ref="new_todo"/>
      </header>
      <section id="main">            
      <input id="toggle-all" ref="toggleAllCheckbox" type="checkbox" onClick={this.toggleAllComplete} />
      <label htmlFor="toggle-all">Mark all complete</label>
      <ul id="todo-list">
      {todos}
      </ul>
      </section>
      <footer id="footer"></footer>
      </section>
    );
  }
});


