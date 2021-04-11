import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap'
import styles from './search.module.css'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { sortFilterTasksThunk } from '../../Redux/actions'
import actionTypes from '../../Redux/actionType'
import DateFormat from '../../Helpers/DateFormat'
import { firstLetterToUppercase } from '../../Helpers/StringFormat'
const Search = (props) => {
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = props
    const handleS = () => {
        const queryData = {}
        for (let key in props) {
            if (props[key]) {
                queryData[key] = typeof props[key] === "object" ? DateFormat(props[key]) : props[key]
            }
        }
        props.handleSubmit(queryData)
    }
    return (
        <>
            <div className={styles.mainSearch}>
                <h1>Search</h1>
                <div className={styles.searchSection}>
                    <div>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Search"
                            style={{ width: "70%" }}
                            value={search}
                            onChange={(e) => props.changeSearchInput(e.target.value)}

                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <DropdownButton id="dropdown-baic-button" variant="dark" title={!!!status ? "Status" : firstLetterToUppercase(status)}>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("done", "status")}>Done</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("active", "status")}>Active</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("", "status")}>Reset</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton id="dropdown-basic-button" title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")} variant="dark" className="ml-3" style={{ width: "200px" }}>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("a-z", "sort")}>A-Z</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("z-a", "sort")}>Z-A</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("creation_date_oldest", "sort")}>creation_date_oldest</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("creation_date_newest", "sort")}>creation_date_newest</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("completion_date_oldest", "sort")} >completion_date_oldest</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("completion_date_newest", "sort")}>completion_date_newest</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => props.changeDropDownValue("", "sort")}>Reset</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className={styles.datePicker}>
                        create_lte: <DatePicker
                            selected={create_lte ? create_lte : null}
                            onChange={date => props.handleSetDate("create_lte", date)}
                        />
                    </div>
                    <div className={styles.datePicker}>
                        create_gte: <DatePicker
                            selected={create_gte}
                            onChange={date => props.handleSetDate("create_gte", date)}
                        />
                    </div>
                    <div className={styles.datePicker}>
                        complete_lte: <DatePicker
                            selected={complete_lte}
                            onChange={date => props.handleSetDate("complete_lte", date)}
                        />
                    </div>
                    <div className={styles.datePicker}>
                        complete_gte: <DatePicker
                            selected={complete_gte}
                            onChange={date => props.handleSetDate("complete_gte", date)}
                        />
                    </div>
                    <div>
                        <Button variant="info mt-3" onClick={handleS}>Search</Button>
                        <Button variant="info mt-3 ml-5" onClick={props.resetSearchForm}>Reset</Button>
                    </div>
                </div>
            </div >
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.searchState
    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeDropDownValue: (value, dropDownType) => dispatch({
            type: actionTypes.SET_STATUS,
            dropDownType,
            value
        }),
        changeSearchInput: (value) => dispatch({
            type: actionTypes.CHANGE_SEARCH_VALUE,
            value
        }),
        handleSetDate: (dateType, date) => dispatch({
            type: actionTypes.SET_SORT,
            dateType,
            date
        }),
        handleSubmit: (queryData) => dispatch(sortFilterTasksThunk(queryData)),
        resetSearchForm: () => dispatch({ type: actionTypes.RESET_SEARCH_FORM })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)