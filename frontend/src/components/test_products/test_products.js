import React from 'react'
import {Link} from 'react-router-dom'
import { Card, Typography, Space } from 'antd';
import './test_product.css';

const { Text } = Typography;
const { Meta } = Card;

const TestProduct = ({testproducts}) => {
    return (
        <Link to = {`/testproducts/${testproducts._id}`}>
        <div className='Card'>
            <img className='img'
                alt="WEARDROP"
                src={testproducts.image}
            />
            <div className='text'>{testproducts.name.nameRus}/{testproducts.name.nameEng}</div>
        </div>
        </Link>
    )
}

export default TestProduct
