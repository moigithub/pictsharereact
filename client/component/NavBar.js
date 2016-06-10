import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    
    render(){
        console.log("navbar props",this.props);
        const { logged, user } = this.props;
        
        return(
            <nav className="menu navbar navbar-inverse">
                        
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topmenu" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link to="/" className="navbar-brand" >PICT Share</Link>
                </div>
                
                
            {logged ? 
                <div className="collapse navbar-collapse" id="topmenu">
                    <ul className="nav navbar-nav">
                        <li><Link to="/Picts">All Picts</Link></li>
                        <li><Link to={"/Picts/Me"}>My Picts</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="navbar-text">Welcome <span>{user.displayName}</span></li>
                        <li><a href="/auth/logout" className="btn"><span className="fa fa-times"></span> Logout</a></li>
                    </ul>
                </div>
            :
                <div className="collapse navbar-collapse" id="topmenu">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="navbar-text">Login with</li>
                        <li><a href="/auth/twitter" className="btn"><span className="fa fa-twitter"></span> Twitter</a></li>
                    </ul>
                </div>
            }
            </nav>
        );
    }
}
NavBar.propTypes ={
    logged: PropTypes.bool,
    user: PropTypes.object
};
