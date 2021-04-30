import React, { Component } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './header.css'
import { useTranslation } from 'react-i18next';
import i18next from '../../i18n';
import weardrop from './weardrop.png';
import { Menu, Dropdown, Button, Space } from 'antd';
import {logoutAction} from '../../actions/userAction'


function Header() {
    const dispatch = useDispatch()
    const { t,i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const handleLogout = () => {
        dispatch(logoutAction())
    }
    const menu = userInfo && userInfo.isAdmin ? (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href={`/manageproducts`}>
                    {t('manage store.1')}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" to={`/managetestproducts`}>
                    {t('manage test products.1')}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href={`/users`}>
                    {t('users.1')}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer"  onClick = {handleLogout}>
                    {t('log out.1')}
                </a>
            </Menu.Item>
        </Menu>
      ) :(
        <Menu>
            <Link to = {`/profile`} >
                <Menu.Item>
                    {t('profile.1')}
                </Menu.Item>
            </Link>
            <Menu.Item onClick = {handleLogout}>
                {t('log out.1')}
            </Menu.Item>
        </Menu>
      );
    return(
        <nav className = 'NavbarItems navbar-expand-sm fixed-top navbar-light' data-spy="affix" data-offset-top="50">
            <Link to = {`/`}><img src={weardrop} alt="this is car image"  className = 'navbarlogo'/></Link>
            
            <ul className = 'nav-menu'>
                <Link to = {`/about`} className = 'nav-links'>{t('About.1')}</Link>
                <Link to = {`/store`} className = 'nav-links'>{t('Store.1')}</Link>
                <Link to = {`/test`} className = 'nav-links'>{t('Test.1')}</Link>
            </ul>
            <Link to = {`/cart`} className = 'nav-but1'>{t('Cart.1')}</Link>
            {userInfo ? (
                <Dropdown overlay={menu} placement="bottomRight">
                <Link to = {`/login`} className = 'nav-but1'>{userInfo.firstName}</Link>
                </Dropdown>
            ) : 
                <Link to = {`/login`} className = 'nav-but2'>{t('SignIn.1')}</Link>
            }
            <button   className = 'nav-lang' onClick={() => i18n.language=="en"? changeLanguage("rus") : changeLanguage("en") }><strong>{t('Lang.1')}</strong></button >
        </nav>
    )
}
export default Header;
