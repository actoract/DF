import React, { useEffect, useState }from 'react'
import {Button} from 'antd'
import './lang-select.module.css'
import { useTranslation } from 'react-i18next';
import i18next from '../../i18n';
import {Switch } from 'antd';
import LogoImg1 from './flag-en.svg'
import LogoImg2 from './flag-rus.svg'
import styles from './lang-select.module.css'

const white = require('./flag-rus.svg')
const black = require('./flag-en.svg')
const shirts = { white, black }

const LangSelect  = () => {
    const [selected, setSelected] = useState(shirts.white)
    const { t } = useTranslation();
   
    function handleClick(checked) {
      if(checked == 1){
        i18next.changeLanguage('en')
      }
      else{
        i18next.changeLanguage('rus')
      }
    }
  return (
    <div className="root">
        <Switch className = {styles.switch} checkedChildren="rus" unCheckedChildren="en" defaultChecked onChange = {(checked) => handleClick(checked)}/>
    </div>
  )
}

export default LangSelect
