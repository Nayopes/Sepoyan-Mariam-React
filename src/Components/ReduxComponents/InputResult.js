import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const InputResult = (props) => {
    const { inputValue, setValue, resetValue } = props
    return (
        <div>
            <h3>Input Result</h3>
            <input
                type='text'
                name='text'
                placeholder='Write something'
                onChange={(e) => setValue(e.target.value)}
                value={inputValue}
            />
            <p>
                Value: {inputValue}
            </p>
            <Button onClick={resetValue}>
                Reset
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValue: (inputValue) => { dispatch({ type: 'setInputValue', inputValue: inputValue }) },
        resetValue: () => dispatch({ type: 'resetValue' })
    }
}


const InputResultWithRedux = connect(mapStateToProps, mapDispatchToProps)(InputResult)
export default InputResultWithRedux