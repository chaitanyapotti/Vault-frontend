import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../static/js/variables';
import {Row, Col} from '../../helpers/react-flexbox-grid';

class DaicoDetails extends React.Component{
    state={
        inifundValue: '',
    }

    onChangeIniFundVal = (e) =>{
        this.setState({
            inifundValue: e.target.value
        })
    }

    uploadDaico = () => {
        console.log('upload DAICO button action');
    }

    render(){
        return(
                <CUICard style={{padding: '40px 67px'}}>
                    <div>DAICO Details</div>
                    <hr/>
                    <Row>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="Initial Fund Release"
                                inputLabel={'Initial Fund Release'}
                                inputPlaceholder="Eg. Aman"
                                inputValue={this.state.inifundValue}
                                textFocus
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeIniFundVal}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.SELECT}
                                iconColor={CS_COLORS.G_DIVIDER}
                                full
                                inputLabel={'DAICO Rounds'}
                                inputValue={this.state.postedBy}
                                items={[{value: 'sdsds', primaryText: 'sdhjds'}]}
                                onChange={this.onSelectPostedBy}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="DAICO Start Date"
                                inputLabel={'DAICO Start Date'}
                                inputPlaceholder="Eg. Wanchain"
                                inputValue={this.state.daicoStrtDt}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeDaicoStart}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <CUIFormInput
                                inputType={CUIInputType.TEXT}
                                full
                                inputName="DAICO End Date"
                                inputLabel={'DAICO End Date'}
                                inputPlaceholder="Eg. ERC"
                                inputValue={this.state.daicoEndDt}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeDaicoEnd}
                            />
                        </Col>
                    </Row>
                </CUICard>
        )
    }
}

export default DaicoDetails;