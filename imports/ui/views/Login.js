import React, {Component} from 'react';
import constants from '../configs/constants'
import sslCertficate from 'get-ssl-certificate'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: '',
            error: '',
        }
    }

    componentDidMount() {
        if (this.props.location.search) {
            error = null;
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const jwt = params.get('jwt');
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    jwt
                })
            }).then(function (res) {
                if (res.ok) {
                    this.props.router.replace('/');
                } else {
                    this.setState({
                        error: res.errors[0].message
                    });
                }
            }).catch(function (err) {
                this.setState({
                    error: "Internal Server Error"
                });
            })
        }
    }


    loginUser(e) {
        // e.preventDefault(); // TODO: Forgot why this was required...
        this.state.error = null
        window.location.href = constants.ssoLoginUrl + "?redirect_uri=" + encodeURI(constants.hostName + this.props.location.pathname);
    }

    render() {
        return (
            <div className="animated fadeIn" style={{
                minHeight: '100vh', minWidth: '100vw',
                backgroundImage: 'url("https://i.l.inmobicdn.net/website/website/2.0.7/v4/img/ix/pro_buy_t1_bg.jpg")'
            }}>
                <div className="loginColumns m-b-xl">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 hidden-xs">
                            <img src="https://i.l.inmobicdn.net/website/website/2.0.7/v4/img/ix/pb_t1_156b.png"
                                 style={{width: '100%'}}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 p-md">
                            <div className="ibox-content">
                                <div className="form-group m-b-md m-t-md">
                                    <img src="/images/InMobiExchangeLogo.png" style={{width: '100%'}}/>
                                </div>
                                <button onClick={this.loginUser.bind(this)}
                                        type="submit"
                                        className={"btn btn-primary block full-width m-b"}>
                                    Login With InMobi SSO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
