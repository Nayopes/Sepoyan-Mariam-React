import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap'
import styles from './search.module.css'
import DatePicker from 'react-datepicker'
const Search = () => {

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

                    />
                </div>
                <div style={{ display: "flex" }}>
                    <DropdownButton id="dropdown-baic-button" variant="dark" title="Status">
                        <Dropdown.Item >Done</Dropdown.Item>
                        <Dropdown.Item >Active</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Sort" variant="dark" className="ml-3" >
                        <Dropdown.Item >A-Z</Dropdown.Item>
                        <Dropdown.Item >Z-A</Dropdown.Item>
                        <Dropdown.Item >creation_date_oldest</Dropdown.Item>
                        <Dropdown.Item >creation_date_newest</Dropdown.Item>
                        <Dropdown.Item >completion_date_oldest</Dropdown.Item>
                        <Dropdown.Item >completion_date_newest</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.datePicker}>
                    create_lte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    create_gte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    complete_lte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    complete_gte: <DatePicker

                    />
                </div>
                <div>
                    <Button variant="info mt-3">Search</Button>
                </div>
                </div>
            </div >
        </>
    )
}
export default Search