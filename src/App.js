import React from 'react';
import ReactDOM from 'react-dom';

class Army extends React.Component {
    
    render () {
        return <h2>Infantry: {this.props.infantry} | Cavalry: {this.props.cavalry} | Artillery {this.props.artillery}</h2>;
    }
}

class AddButton extends React.Component {

    render () {
        return <button key={this.props.key}>Add army</button>
    }

}

export {
    Army,
    AddButton
};