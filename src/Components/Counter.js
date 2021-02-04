import React from 'react';
import Actions from './Actions'
import Result from './Result'

class Counter extends React.Component {
    state = {
        count: 0
    }
    handlePlusCount = (SEvent) => {
        this.setState({
            count: this.state.count + 1
        })
    }
    handleMinusCount = (SEvent) => {
        this.setState({
            count: this.state.count - 1
        })
   }
    render() {
        return(
            <div className="Counter">
                <Result count = {this.state.count} />
                <Actions handlePlusCount = {this.handlePlusCount} handleMinusCount = {this.handleMinusCount} />
            </div>
        )
    }
}
export default Counter