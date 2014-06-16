var app = app || {};

var TodoView = React.createClass({
    getInitialState: function(){
        return {completed: this.props.todo.get('completed'),
            title: this.props.todo.get('title')
        };
    },
    
    componentWillMount: function(){
        
    },

    toggle: function(){
        // update the model
        this.props.todo.toggle();
        // set the state
        this.setState({completed: !this.state.completed});
    },

    destroy: function(){
        // destroy the model
        this.props.todo.destroy();
        // call the parent destroy handler (to set state and re-render)
        this.props.onDestroy();
    },
    
    render: function(){
        return (
            <li>
            <div className="view">
            <input className="toggle" type="checkbox" checked={this.state.completed}
            onChange={this.toggle} />
            <label>{this.state.title}</label>
            <button className="destroy" onClick={this.destroy}></button>
            </div>
            <input className="edit" value={this.props.todo.get('title')} />
            </li>
        );
    } 
});

app.TodoView = TodoView;
