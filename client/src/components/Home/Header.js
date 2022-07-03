import React from 'react'

function Header() {
  return (
    <>
          <header>
                <h2><label for="nav-toggle">
                        <span className='bx bx-menu'></span>
                    </label>Dashboard</h2>
                <div className="user">
                    {/* <img src="1.jpg" width="40px" height="40px" alt=""> */}
                    <div>
                        <h4>Ayush Gaikwad</h4>
                        <a href="">Admin</a>
                    </div>
                </div>
            </header>
    </>
  )
}

export default Header