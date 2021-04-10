import React from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const SelectItemList = (props) => {
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
                    <select
                    className = "SelectBut"
                    id = "1">
                    {Object.keys(list_item).map(id => (
                        <option value={id} className="card-panel">
                        {list_item[id]}
                        </option>
                    ))}
                    </select>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default SelectItemList

