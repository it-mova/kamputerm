import { AutoComplete } from 'material-ui';
import { Route, Link} from 'react-router'
import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../store/storeConfig';
class MainView extends React.Component {

    constructor(props) {
        super(props);
    }

    handleUpdateInput(value) {
        this.props.changeWord(value);
    };


    render() {
        return (
            <div style={{backgroundColor : '#fff'}}>
                <AutoComplete
                    hintText="Калі ласка, Увядзіце слова"
                    style={{marginLeft : '100px'}}
                    dataSource={this.props.hints}
                    onUpdateInput={(value) => this.handleUpdateInput(value)}
                />
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        hints: state.word.hints
    }),
    dispatch => ({
        changeWord : value => {
            dispatch(actions.changeWord(value))
        }
    })
)(MainView);