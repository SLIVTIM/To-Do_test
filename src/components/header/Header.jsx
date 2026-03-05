import './Header.css'

function Header({ total, done }) {
  return (
    <header className="header-wrapper">
      <h1>my <span>tasks.</span></h1>
      <p>{total} tasks · {done} done</p>
    </header>
  )
}

export default Header