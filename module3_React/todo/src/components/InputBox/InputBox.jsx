import React, { Component } from 'react';

class InputBox extends Component {
    state = {
        todoValue: ""
    };

    handleOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            todoValue: value
        });
    }

    handleAddTodo = () => {
        let todoValue = this.state.todoValue;
        this.props.addTodo(todoValue);
        this.setState({
            todoValue: ""
        });
    }
    render() {
        let todoValue = this.state.todoValue;
        return (
            <div className="input-box container input-group mt-4">
                <input
                    type="text"
                    className="form-control"
                    value={todoValue}
                    onChange={this.handleOnChange}
                />
                <button className="btn btn-primary" onClick={this.handleAddTodo}>
                    Add Todo
                </button>
            </div>
        );
    }
}

export default InputBox;