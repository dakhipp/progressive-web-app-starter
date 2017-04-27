import React from 'react'
import { connect } from "react-redux";
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import CloseIcon from 'material-ui/svg-icons/content/clear';

export default class DefaultLayout extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
    	open: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  toggleDrawer() {
  	this.setState({
  		open: !this.state.open
  	})
  }

  closeDrawer() {
  	this.setState({
  		open: false
  	})
  }

	render() {
		console.log(this.props);
		return (
    	<div>
	      <AppBar
			    title="App Shell"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"
			    onLeftIconButtonTouchTap={this.toggleDrawer}
			  />
			  <Drawer 
			    open={this.state.open} 
			    docked={false} 
			    onRequestChange={this.closeDrawer}
			  >
			  	<div style={style.headerContainer}>
				  	<h2>App Shell</h2>
				  	<CloseIcon onClick={this.closeDrawer} />
	  			</div>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/"
	        		style={style.link}
	        	>Home</Link>
	        </MenuItem>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/about"
	        		style={style.link}
	        	>About</Link>
	        </MenuItem>
	      </Drawer>
	      <div style={style.pageContainer}>
		      {this.props.children}
  			</div>
      </div>
	  )
	}
}

const style = {
	headerContainer: {
		display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    paddingRight: '10px',
	},
	link: {
		display: 'block',
	},
	pageContainer: {
		paddingLeft: '5px',
		paddingRight: '5px',
	}
}
