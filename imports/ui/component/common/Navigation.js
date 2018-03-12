import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import metisMenu from 'metismenu';

class Navigation extends Component {

    componentDidMount() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation" style={{height: '100%'}}>
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element">
                                <img src="/images/InMobiExchangeBeta.png" style={{width: '100%'}}/>
                            </div>
                            <div className="logo-element no-padding" style={{overflow: 'hidden'}}>
                                <img src="/images/InMobiLogoTransparent.png" style={{width: '85%'}}/>
                            </div>
                        </li>
                        <li className={this.activeRoute("/adomain")} nav-tab>
                            <Link to="/adomain"><i className="fa fa-th-list"></i> <span className="nav-label">Adomain</span></Link>
                        </li>
                        <li className={this.activeRoute("/login")}>
                            <Link to="/login"><i className="fa fa-th-large"></i> <span className="nav-label">Login</span></Link>
                        </li>
                    </ul>
            </nav>
        )
    }
}

export default Navigation