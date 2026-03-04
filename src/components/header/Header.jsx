import './Header.css'
import toDoListSvg from './../../assets/header/to-do-list.svg'

function Header() {
    return (
        <>
            <div className='title-container'>
                <h1>To Do List</h1>
                <img src={toDoListSvg} alt="To Do List Image" />
            </div>
        </>
    )
}

export default Header 