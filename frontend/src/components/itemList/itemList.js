import React from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const ItemList = (props) => {
    const text = props.text;
    const list_item = props.list_item;
    const { t } = useTranslation(); 
    return (
        <ListGroup.Item >
            <Row>
                <Col>
                    {t(text)}
                </Col>
                <Col>  
                    {list_item == undefined &&  text == "Price.1"? t('Select clothes type.1') : 
                    list_item == undefined &&  text == "Status.1" || list_item == undefined &&  text == "Number.1"? t('Select clothes size.1') 
                    : list_item} 
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default ItemList

