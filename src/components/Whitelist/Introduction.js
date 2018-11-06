import React, { Component } from 'react';

class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 1 INTRODUCTION</div>
                <div className="txt push--top">
                    To be whitelisted you must complete the following steps if you have any questions and concerns during
                    the KYC process, please email <span>admin@electus.network</span> or drop us a message in our Telegram channel.
                </div>
            </div> 
        );
    }
}
 
export default Introduction;