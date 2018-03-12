import React, {Component} from 'react';

export default class CubeGridSpinner extends Component {
    render() {
        const { height, fullHeight } = this.props;

        const style = {
            display: 'flex',
            alignItems: 'center',
        };

        if (fullHeight) {
            style.height = '100vh';
        } else if (null != height) {
            style.height = height + 'px'
        }

        return (
            <div style={style}>

                {/*
        <div className="sk-spinner sk-spinner-cube-grid" >
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
          <div className="sk-cube"></div>
        </div>


        <div className="sk-spinner sk-spinner-wandering-cubes">
          <div className="sk-cube1"></div>
          <div className="sk-cube2"></div>
        </div>


        <div className="sk-spinner sk-spinner-wave">
          <div className="sk-rect1"></div>
          <div className="sk-rect2"></div>
          <div className="sk-rect3"></div>
          <div className="sk-rect4"></div>
          <div className="sk-rect5"></div>
        </div>


        <div className="sk-spinner sk-spinner-chasing-dots">
          <div className="sk-dot1"></div>
          <div className="sk-dot2"></div>
        </div>

         */}


                <div className="sk-spinner sk-spinner-circle">
                    <div className="sk-circle1 sk-circle"></div>
                    <div className="sk-circle2 sk-circle"></div>
                    <div className="sk-circle3 sk-circle"></div>
                    <div className="sk-circle4 sk-circle"></div>
                    <div className="sk-circle5 sk-circle"></div>
                    <div className="sk-circle6 sk-circle"></div>
                    <div className="sk-circle7 sk-circle"></div>
                    <div className="sk-circle8 sk-circle"></div>
                    <div className="sk-circle9 sk-circle"></div>
                    <div className="sk-circle10 sk-circle"></div>
                    <div className="sk-circle11 sk-circle"></div>
                    <div className="sk-circle12 sk-circle"></div>
                </div>


            </div>
        );
    }
}
