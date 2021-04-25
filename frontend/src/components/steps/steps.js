import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Steps } from 'antd';

const StepsComp = ({step1, step2, step3, step4}) => {
    const { Step } = Steps;
    return (
        <div>
            <Steps current={step1 ? 0 : step2 ? 1: step3 ? 2: 3}>
                <LinkContainer to='/login'>
                    <Step title="sign in" description="This is a description." />
                </LinkContainer>
                {step2 || step3 || step4 ? 
                    <LinkContainer to='/shipping'>
                        <Step title="shipping address"  description="This is a description." />
                    </LinkContainer> : 
                    <Step title="shipping address"  description="This is a description." />
                }
                {step3 || step4 ? 
                    <LinkContainer to='/payment'>
                        <Step title="payment" description="This is a description." />
                    </LinkContainer> : 
                    <Step title="payment" description="This is a description." />
                }
                {step4 ? 
                    <LinkContainer to='/placeorder'>
                        <Step title="place order" description="This is a description." />
                    </LinkContainer> : 
                    <Step title="place order" description="This is a description." />
                }
            </Steps>
        </div>
    )
}
export default StepsComp
