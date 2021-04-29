import React, {useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd';

const ModalMessage = ({isModalVis, id}) => {
    const { t } = useTranslation(); 
    const [isModalVisible, setIsModalVisible] = useState({isModalVis});

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <div>
            <Modal title="Order details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>ID: {id}</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default ModalMessage
