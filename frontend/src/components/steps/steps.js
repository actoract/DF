import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Steps } from 'antd';
import { useTranslation } from 'react-i18next'

const StepsComp = ({step1, step2, step3, step4}) => {
    const { Step } = Steps;
    const { t } = useTranslation(); 
    return (
        <div>
            <Steps current={step1 ? 0 : step2 ? 1: step3 ? 2: 3}>
                <LinkContainer to='/login'>
                    <Step title={t('SignIn.1')} description={t('SignIn.2')} />
                </LinkContainer>
                {step2 || step3 || step4 ? 
                    <LinkContainer to='/deliveryaddress'>
                        <Step title={t('Shipping address.2')}  description={t('Shipping address.3')} />
                    </LinkContainer> : 
                    <Step title={t('Shipping address.2')} description={t('Shipping address.3')} />
                }
                {step3 || step4 ? 
                    <LinkContainer to='/payment'>
                        <Step title={t('Payment method.2')} description={t('Payment method.3')} />
                    </LinkContainer> : 
                    <Step title={t('Payment method.2')} description={t('Payment method.3')} />
                }
                {step4 ? 
                    <LinkContainer to='/placeorder'>
                        <Step title={t('place order.1')} description={t('place order.2')}  />
                    </LinkContainer> : 
                    <Step title={t('place order.1')} description={t('place order.2')}  />
                }
            </Steps>
        </div>
    )
}
export default StepsComp
