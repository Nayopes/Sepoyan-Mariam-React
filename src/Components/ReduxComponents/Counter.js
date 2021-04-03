import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

const Counter = (props) => {
    const { counter, plusCount, minusCount, restartCount } = props
    return (
        <div>
            <h1>Counter from Redux!</h1>
            <div className='mb-5'>
                <h3>
                    Counter : {counter}
                </h3>
                <Button
                    onClick={plusCount}
                >
                    +
                </Button>
                <Button
                    onClick={minusCount}
                    className='mx-3'
                >
                    -
                </Button>
                <Button
                    onClick={restartCount}
                >
                    0
                </Button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        plusCount: () => dispatch({ type: 'plus' }),
        minusCount: () => dispatch({ type: 'minus' }),
        restartCount: () => dispatch({ type: 'restart' })
    }
}
const CounterWithState = connect(mapStateToProps, mapDispatchToProps)(Counter)
export default CounterWithState