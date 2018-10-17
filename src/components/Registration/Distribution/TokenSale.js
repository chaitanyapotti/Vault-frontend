import React from 'react';
import {CUIFormInput} from '../../../helpers/material-ui';
import {CUIInputType} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';

class TokenSale extends React.Component{
    state={
        tsl1: '',
        tsl2: '',
        tsl3: '',
    }

    onChangeTknSaleL1 = (e) =>{
        this.setState({
            tsl1: e.target.value
        })
    }

    render(){
        return(
                <div>
                    <div>Token Sale Distribution</div>
                    <hr/>
                    <Row>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Sold at Level 1"
                                inputLabel={'Tokens Sold at Level 1'}
                                inputPlaceholder=""
                                inputValue={this.state.tsl1}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Price at Level 1 (ETH)"
                                inputLabel={'Tokens Price at Level 1 (ETH)'}
                                inputPlaceholder=""
                                inputValue={this.state.inifundValue}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Sold at Level 2"
                                inputLabel={'Tokens Sold at Level 2'}
                                inputPlaceholder=""
                                inputValue={this.state.inifundValue}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Price at Level 2 (ETH)"
                                inputLabel={'Tokens Price at Level 2 (ETH)'}
                                inputPlaceholder=""
                                inputValue={this.state.inifundValue}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Sold at Level 3"
                                inputLabel={'Tokens Sold at Level 3'}
                                inputPlaceholder=""
                                inputValue={this.state.inifundValue}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Tokens Price at Level 3 (ETH)"
                                inputLabel={'Tokens Price at Level 3 (ETH)'}
                                inputPlaceholder=""
                                inputValue={this.state.inifundValue}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                    </Row>
                </div>
        )
    }
}

export default TokenSale;