function Actions ({handlePlusCount, handleMinusCount}) {
    const plus = () => {
        handlePlusCount()
    }
    const minus = () => {
        handleMinusCount()
    }
    return(
        <div>
            <button onClick = {handlePlusCount}
            >+</button>
            <button onClick = {handleMinusCount}
            >-</button>
        </div>
    )
}
export default Actions