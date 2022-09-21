import React from 'react'
import { Row, Col } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'
import storeItems from "../data/items.json"

const Store = () => {
    return (<>
        <h1>store</h1>

        <Row md={2} xs={1} lg={3} className="g-3">
            {storeItems.map(i => (<Col key={i.id}>
                <StoreItem {...i}/>
            </Col>))}
        </Row>
    </>)
}

export default Store
