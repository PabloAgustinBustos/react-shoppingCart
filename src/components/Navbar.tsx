import React from 'react'
import { Navbar as NavbarBs, Container, Nav, Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import cart from "../assets/cart.svg"
import { useShoppingCart } from '../context/ShoppingCartContext'

const Navbar = () => {
    const {openCart, cartQuantity} = useShoppingCart()

    return (
        <NavbarBs sticky='top' className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>home</Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                </Nav>

                {cartQuantity > 0 ? (
                    <Button onClick={openCart} style={{width: "3rem", height:"3rem", position:"relative"}} variant="outline-primary" className='rounded-circle'>
                        <img src={cart}/>
                        <div style={{color: 'white', width: "1.5rem", height:"1.5rem", position:"absolute", bottom: -6, right:-6}} className='rounded-circle bg-danger d-flex justify-content-center align-items-center'>{cartQuantity}</div>
                    </Button>
                ) : null}

            </Container>
        </NavbarBs>
    )
}

export default Navbar
