import React, { Component } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './header.css'
import 'antd';
import {BrowserView, MobileView} from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import i18next from '../../i18n';
import weardrop from './weardrop.jpg';
import dropDownMenu from './DropDownMenu.png';
import { Menu, Dropdown, Row, Col } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import {logoutAction} from '../../actions/userAction'


function Header() {
    const dispatch = useDispatch()
    const { t,i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin
    const handleLogout = () => {
        dispatch(logoutAction())
    }
    const menu = userDet && userDet.isAdmin ? (
        <Menu>
            <Menu.Item>
                <Link to = {`/manageproducts`}>
                    {t('manage store.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/managetestproducts`}>
                    {t('manage test products.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link  to = {`/ordersadmin`}>
                    {t('orders.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link  to = {`/usersadmin`}>
                    {t('users.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link  onClick = {handleLogout}>
                    {t('log out.1')}
                </Link >
            </Menu.Item>
        </Menu>
      ) :(
        <Menu>
            <Menu.Item>
                <Link  to = {`/profile`}>
                    {t('profile.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link onClick = {handleLogout}>
                {t('log out.1')}
                </Link >
            </Menu.Item>
        </Menu>
      );

      const menuMobile_NotUser = (<Menu>
            <Menu.Item>
                <Link to = {`/about`}>
                    {t('About.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/store`}>
                    {t('Store.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/test`}>
                    {t('Test.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/cart`}>
                    {t('Cart.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/login`}>
                    {t('SignIn.1')}
                </Link>
            </Menu.Item>
        </Menu>)

      const menuMobile = userDet && userDet.isAdmin ? (
        <Menu>
            <Menu.Item>
                <Link to = {`/about`}>
                    {t('About.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/store`}>
                    {t('Store.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/test`}>
                    {t('Test.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/manageproducts`}>
                    {t('manage store.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/managetestproducts`}>
                    {t('manage test products.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link  to = {`/ordersadmin`}>
                    {t('orders.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link  to = {`/usersadmin`}>
                    {t('users.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/cart`}>
                    {t('Cart.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link  onClick = {handleLogout}>
                    {t('log out.1')}
                </Link >
            </Menu.Item>
        </Menu>
      ) :(
        <Menu>
            <Menu.Item>
                <Link to = {`/about`}>
                    {t('About.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/store`}>
                    {t('Store.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/test`}>
                    {t('Test.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link  to = {`/profile`}>
                    {t('profile.1')}
                </Link >
            </Menu.Item>
            <Menu.Item>
                <Link to = {`/cart`}>
                    {t('Cart.1')}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link onClick = {handleLogout}>
                {t('log out.1')}
                </Link >
            </Menu.Item>
        </Menu>
      );
    return(
        <>
        <BrowserView>
            <Row className = 'NavbarItems'  gutter={[16, 16]}>
                <div className = 'navbarlogo'>
                    <Link to = {`/`}><img src={weardrop} alt="this is image"  className = 'navbarlogo'/></Link>
                </div>
                <div className = 'nav-menu'>
                    <Link to = {`/about`} className = 'nav-links'>{t('About.1')}</Link>
                    <Link to = {`/store`} className = 'nav-links'>{t('Store.1')}</Link>
                    <Link to = {`/test`} className = 'nav-links'>{t('Test.1')}</Link>
                </div>
                <div className = 'nav-menu-left'>
                    <Link to = {`/cart`} className = 'nav-but1'>{t('Cart.1')}</Link>
                    {userDet ? (
                        <Dropdown overlay={menu} placement="bottomRight">
                        <Link to = {`/login`} className = 'nav-but1'>{userDet.firstName}</Link>
                        </Dropdown>
                    ) : 
                        <Link to = {`/login`} className = 'nav-but2'>{t('SignIn.1')}</Link>
                    }
                    <button   className = 'nav-lang' onClick={() => i18n.language=="en"? changeLanguage("rus") : changeLanguage("en") }><strong>{t('Lang.1')}</strong></button >
                </div>
            </Row>
        </BrowserView>
        <MobileView>
            <div className = 'NavbarItems'  gutter={[16, 16]}>
                    <Link to = {`/`}><img src={weardrop} alt="this is image"  className = 'navbarlogo'/></Link>
                    {userDet ? (
                        <Dropdown overlay={menuMobile} placement="bottomRight">
                            <img src={dropDownMenu} alt="this is drop down menu" className="dropDownMenu_Header"/>
                        </Dropdown>
                    ) : 
                        <Dropdown overlay={menuMobile_NotUser} placement="bottomRight" >
                            <img src={dropDownMenu} alt="this is drop down menu"  className="dropDownMenu_Header"/>
                        </Dropdown>
                    }
                    <button   className = 'nav-lang' onClick={() => i18n.language=="en"? changeLanguage("rus") : changeLanguage("en") }><strong>{t('Lang.1')}</strong></button >
            </div>
        </MobileView>
        </>
    )
}
export default Header;
