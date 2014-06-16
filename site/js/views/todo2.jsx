var TodoView = React.createBackboneClass({
    getInitialState: function(){
        return {editing: "edit"};
    },
    
    toggle: function(){
        this.getModel().toggle();
    },

    destroy: function(){
        this.getModel().destroy();
    },

    editTodo: function(){
        this.setState({editing: "editing"});
    },

    updateTodo: function(e){
        if (e.keyCode === 13){
            this.getModel().save({title: this.refs.newTitle.getDOMNode().value.trim()})
            this.setState({editing: "edit"});
        }
    },
    
    render: function(){
        return (
            <li>
            <div className="view">
            <input className="toggle" type="checkbox" onChange={this.toggle}
            checked={this.getModel().get('completed')} />
            <label onDoubleClick={this.editTodo}>{this.getModel().get('title')}</label>
            <button className="destroy" onClick={this.destroy}></button>
            </div>
            <input className={this.state.editing} defaultValue={this.getModel().get('title')}
            onKeyPress={this.updateTodo} ref="newTitle"/>
            </li>
        );
    }
});
