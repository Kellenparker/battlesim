import React from 'react';
import ReactDOM from 'react-dom';

class Army extends React.Component {
    
    render () {
        return  (
            <div>
            {
                this.props.army.map(function(page) {
                    return <div>Title: {this.props.army["army1"].infantry}.</div>;
                })
            }
            </div>
        )
    };
}

export default Army;