import React from 'react'
import {Link} from 'react-router-dom'
import { Card, Typography, Space } from 'antd';
import './products.css';

const { Text } = Typography;
const { Meta } = Card;

const Products = ({product}) => {
    return (
        <Link to = {`/products/${product._id}`}>
            <div className='Card'>
                <img className='img'
                    alt="WEARDROP"
                    src={product.image}
                />
                <div className='text'>{product.name.nameRus} / {product.name.nameEng}</div>
            </div>
        </Link>
    )
}
export default Products
