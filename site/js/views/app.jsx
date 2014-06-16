var app = app || {};

var AppView = React.createClass({
  getInitialState: function(){
    return {data : app.Todos};
  },

  componentWillMount: function(){
    // use this if you want to fetch new item from server at every interval
    // setInterval(this.addTodo, 2000);
  },

  addTodo: function(e){
    if(e.keyCode === 13) {  // ENTER KEY
                            var title = this.refs.new_todo.getDOMNode().value.trim();
                            app.Todos.add({title: title, completed: false,
                                           // id: just increase
                                           id: app.Todos.length + 1});
                            this.setState({data: app.Todos});
                            this.refs.new_todo.getDOMNode().value = '';
                            }
  },

  onTodoDestroy: function(){
    this.setState({data: app.Todos});
  },
  
  render: function(){
    // get the onTodoDestroy function, you cannot refer this in the map() func
    var todoDestroyHandler = this.onTodoDestroy;
    var todoList = this.state.data.map(function(todo){
      return <TodoView todo={todo} onDestroy={todoDestroyHandler} key={todo.get('id')}></TodoView>;
    });
    
    return (
      <section id="todoapp">
        <header id="header">
          <h1>todos</h1>
          <input id="new-todo" placeholder="What needs to be done?" autofocus
                 onKeyPress={this.addTodo} ref="new_todo"/>
        </header>
        <section id="main">            
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all complete</label>
          <ul id="todo-list">
            {todoList}
          </ul>
        </section>
        <footer id="footer"></footer>
      </section>
    );
  } 
});

React.renderComponent(
  <AppView />, document.body
);

app.AppView = AppView;
