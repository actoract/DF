import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Popover, Modal } from 'antd';
import ModalMessage from "../modalMessage"
import {Link} from 'react-router-dom'
import Loader from '../loader'
import {USER_PROFILE_UPD_RESET} from '../../constants/storeConst'
import {getProfileAction, 
        usersAction,
        updProfileAction} from '../../actions/userAction'
import { set } from 'mongoose';

const CartDetails = ({id, text, image, uploadImage, details, type, page, match, history, admin}) => {
    const userId = match
    const dispatch = useDispatch()
    const { t } = useTranslation(); 
    const messageOnHover = (
        <div>
          <p>In order to get details click on order</p>
        </div>
      );
    const messageAdminOnHover = (
    <div>
        <p>In order to update user statut click on profiler</p>
    </div>
    );
    
    const [isModalVis, setIsModalVisible] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [idChange, setIdChange] = useState("");

    //const allUsers = useSelector(state => state.allUsers)
    //const { users, loading, error  } = allUsers

    const userProfile = useSelector(state => state.userProfile)
    const {user, loading: loadingProfile, error: errorProfile} = userProfile

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success: UpdSucccess, loading: loadingUpdProfile, error: errorUpdProfile} = userUpdProfile
    useEffect(() => {
        if(UpdSucccess){
            setAdmin(user.isAdmin)
            dispatch({type: USER_PROFILE_UPD_RESET})
            //history.push()
        }
        else{
            if(user.name && user._id !== userId){
                dispatch(getProfileAction())
            }
            else{
                setAdmin(!user.isAdmin)
            }
        }
    }, [dispatch, history, userId, user, UpdSucccess])

    const showModalMessage = () => {
        setIsModalVisible(true);
    }
    const handleStatusChange = (e, id) => {
        e.preventDefault()
        //alert(id)
        setAdmin(e.target.value)
        setIdChange(id)
        dispatch(updProfileAction({_id: id, isAdmin}))
    }
    return (
        <div>{   
        type === "header"?
            <Row key="header">
                {id ? <Col md={4} className =""><strong>{id}</strong></Col>: <div/>}
                {text ? text.map(item => (<Col md={2} className =""> <strong>{item} </strong> {} </Col>)) : <div/>}
            </Row> :
            page == "user"?
            <Popover content={messageOnHover} title="How to get order details?" key={id}>    
            <Link to = {`/order/${id}`}>
                <Row className = "CardDetails2 details" key = {id}>
                    {id ? <Col md={4}> {id}</Col>: <div/>}
                    {text ? text.map(item => 
                        item == false ? (<Col md={2}> <strong>✕</strong> {} </Col>) : 
                        item != true ? (<Col md={2}>  {item}  </Col>) : (<Col md={2}>  ✓  </Col>)) : <div/>
                    }
                </Row>
            </Link>
            </Popover> :
            <Popover content={messageAdminOnHover} title="How to update user status?" key={id}> 
            <Row className = "CardDetails2 details" onClick = {(e => handleStatusChange(e, id))} key ={id}>
                {id ? <Col md={4}> {id}</Col>: <div/>}
                {text ? text.map(item => 
                    item!== false && item!==true?  (<Col md={2}>  {item}  </Col>) :
                    isAdmin == true && idChange == id ? (<Col md={2}>  ✓  </Col>) : 
                    isAdmin == false && idChange == id ? (<Col md={2}> <strong>✕</strong></Col>) : 
                    isAdmin == false && idChange == "" ? (<Col md={2}> <strong>✕</strong></Col>) : (<Col md={2}> <strong>  ✓  </strong></Col>)) : <div/>
                }
            </Row>
            </Popover>
        }
        {isModalVis ? <ModalMessage isModalVis = {isModalVis} key = {id}/> : <div/>}
        </div>
    )
}
export default CartDetails
