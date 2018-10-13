import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CUICard, CUIFormInput, CUIButton} from '../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../static/js/variables';
import {Row, Col} from '../../helpers/react-flexbox-grid';
import { initialFundReleaseChangedAction,
    daicoRoundsChangedAction, daicoStartDateChangedAction, daicoEndDateChangedAction, round1TokensChangedAction, round1RateChangedAction,
    round2TokensChangedAction, round3TokensChangedAction, round3RateChangedAction } from '../../actions/projectRegistrationActions';

class DaicoDetails extends React.Component{

    onChangeIniFundVal = (e) =>{
        this.props.initialFundReleaseChangedAction(e.target.value)
    }

    onSelectDaicoRounds = (e) => {
        console.log(e.target.value)
        this.props.daicoRoundsChangedAction(e.target.value)
    }

    onChangeDaicoStart = (e) => {
        this.props.daicoStartDateChangedAction(e.target.value)
    }

    onChangeDaicoEnd = (e) => {
        this.props.daicoEndDateChangedAction(e.target.value)
    }

    uploadDaico = () => {
        console.log('upload DAICO button action');
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        {/* <CUIButton
                            type={CUIButtonType.RAISED}
                            buttonColor={CUIInputColor.PRIMARY}
                            id="Publish DAICO"
                            label={'Publish DAICO'}
                            // disabled={!this.state.validPassword}
                            onClick={() => {
                                this.uploadDaico();
                            }}
                        /> */}
                    </Col>
                </Row>
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
                                inputValue={this.props.initialFundRelease}
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
                                inputValue={this.props.daicoRounds}
                                items={[{value: '3', primaryText: '3'}, {value: '2', primaryText: '2'}, {value: '1', primaryText: '1'}]}
                                onChange={this.onSelectDaicoRounds}
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
                                inputValue={this.props.daicoStartDate}
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
                                inputValue={this.props.daicoEndDate}
                                // onBlur={this.onBlurAge}
                                // error={this.state.errorAgeText !== ''}
                                // helperText={this.state.errorAgeText}
                                // onKeyDownSelector="Admin"
                                onChange={this.onChangeDaicoEnd}
                            />
                        </Col>
                    </Row>
                </CUICard>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { initialFundRelease, daicoRounds,
        daicoStartDate, daicoEndDate, round1Tokens, round1Rate, round2Tokens, round2Rate,
        round3Tokens, round3Rate, } = state.activeDaicosData || {}
    return {
        initialFundRelease: initialFundRelease,
        daicoRounds: daicoRounds,
        daicoStartDate: daicoStartDate,
        daicoEndDate: daicoEndDate,
        round1Tokens: round1Tokens,
        round1Rate: round1Rate,
        round2Tokens: round2Tokens,
        round2Rate: round2Rate,
        round3Tokens: round3Tokens,
        round3Rate: round3Rate,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        initialFundReleaseChangedAction: initialFundReleaseChangedAction,
        daicoRoundsChangedAction: daicoRoundsChangedAction,
        daicoStartDateChangedAction: daicoStartDateChangedAction,
        daicoEndDateChangedAction: daicoEndDateChangedAction,
        round1TokensChangedAction: round1TokensChangedAction,
        round1RateChangedAction: round1RateChangedAction,
        round2TokensChangedAction: round2TokensChangedAction,
        round3TokensChangedAction: round3TokensChangedAction,
        round3RateChangedAction: round3RateChangedAction
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DaicoDetails);