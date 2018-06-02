import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.css';
// import './style.less';
import tsIcon from './500.jpeg';

/* const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px'
    },
    containerBtn: {
        margin: '0 20px',
        backgroundColor: '#dde18e'
    }
} */

class App extends Component {
	render() {
		/* return <div>
            <h1>Hello, world123</h1>
            <div style={styles.container}>
                <button style={styles.containerBtn}>hello again</button>
            </div>
        </div> */
		return <div>
			<h1>Hello, world2</h1>
			<div style={{background: `url(${tsIcon}) no-repeat`,width:'100px',height:'100px'}}></div>
			<div className='container'>
				<button>hello again</button>
			</div>
		</div>;
	}
}

ReactDom.render(
	<App />,
	document.getElementById('root')
);