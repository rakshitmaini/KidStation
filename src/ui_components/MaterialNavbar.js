import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link} from 'react-router-dom'
import { ListItemText, ListItem, Drawer, Collapse, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import fulllogo from '../../src/images/Fulllogo_animated.svg';

class MaterialNavbar extends Component {
    state={
        sidebar:false,
        categorytoggle: false,
        activeNavIndex:-1,
        activeCategoriesIndex:-1
    }
    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ sidebar: open });
    }
    handletoggle = () =>{
        this.setState((prevState)=>({categorytoggle: !prevState.categorytoggle}));
        this.setState({sidebar:true});
    }
    handleSideNavClick = (item,index) =>{
        this.setState({activeNavIndex:index});
        this.setState({activeCategoriesIndex:-1});
        this.setState({sidebar:false});
        if(item.name==='Categories'){
            this.handletoggle();
        }
        
        // (item.name=='Categories')? this.handletoggle: null;
    }
    handleSideCategoryClick = (itemname,i) =>{
        this.setState({activeCategoriesIndex:i});
        this.setState({sidebar:false});
    }
    handleLogoClick = () =>{
        this.setState({
            activeNavIndex:0,
            activeCategoriesIndex:-1,
            sidebar: false
        })
    }

    render() {
        const list= [
            {name:"Home",link:'/'},
            {name:"Shop",link:'/shop'},
            {name:"Categories",link:"#"},
            {name:"Best Selling",link:'/bestselling'},
            {name:"Track your Order",link:'/trackyourorder'},
            {name:"Contact Us",link:'/contact'}
        ];
        const CategoriesList = [
            {name:"Eraser & Sharpner",link:'/erasers'},
            {name:"Lunch Box",link:'/lunch_boxes'},
            {name:"Water Bottle",link:'/water_bottles'},
            {name:"Pen & Pencil",link:'/pens'},
            {name:"Sketch - Pen & Marker",link:'/sketch_pens'},
            {name:"Notebook",link:'/notebooks'},
            {name:"Stationery Kit",link:'/stationery_kits'},
            {name:"Ruler",link:'/rulers'},
        ];
        const categoriesNav = CategoriesList.map((itemname,i)=>{
            return(
                <>
                    <Collapse in={this.state.categorytoggle} timeout="auto">
                        <div className={i===this.state.activeCategoriesIndex ? 'category-list-outer categorylistdiv':'categorylistdiv'} onClick={()=>{this.handleSideCategoryClick(itemname,i)}}>
                        <ListItem button>
                            <NavLink to={itemname.link}>
                                <ListItemText className={i===this.state.activeCategoriesIndex ? 'category-list-outer':'category-list'} primary={itemname.name} />
                            </NavLink>
                        </ListItem>
                        </div>
                    </Collapse>
                </>
            )
        });
        return (
            <div>
                {/* <MenuIcon onClick={this.toggleDrawer(true)} style={{fontSize:'3.5rem', backgroundColor:'#aaa', float:'left'}} /> */}
                <Grid container alignItems="center" xs={12} className="navigation">
                    <Grid item xs={4} sm={2}>
                        <MenuIcon className="NavMenuIcon" onClick={this.toggleDrawer(true)} style={{fontSize:'4rem'}} />
                    </Grid>
                    <Grid item xs={8} sm={4} className="fulllogo">
                        <Link to="/" onClick={this.handleLogoClick}>
                            <img alt="" src={fulllogo} width="100%" max-width="225px" />
                        </Link>
                    </Grid>
                    <Grid align="center" item xs={12} sm={6} className="RightNavItems">
                        <div>
                            <span>
                                <Link style={{textDecoration:'none'}} to="">
                                    Support 
                                </Link>
                            </span>
                            <span>
                                <Link style={{textDecoration:'none'}} to="">
                                    Help
                                </Link>
                            </span>
                        </div>
                    </Grid>
                </Grid>
                <Drawer className="sidenavbar" anchor="left" open={this.state.sidebar} onClose={this.toggleDrawer(false)}>
                    <div style={{padding:'2rem 2rem 2rem 0', float:'left'}}>
                        <Link to="/" onClick={this.handleLogoClick}>
                            <img alt="" src={fulllogo} width="100%" />
                        </Link>
                    </div>
                    {list.map((item,index)=>{
                        return (
                            <div>
                                <div className={index===this.state.activeNavIndex ? 'side-drawer-outer sidedrawerdiv':'sidedrawerdiv'} onClick={()=>{this.handleSideNavClick(item,index)}}>
                                    <ListItem button >
                                        <NavLink to={item.link}>
                                            <ListItemText className={index===this.state.activeNavIndex ? 'side-drawer-outer':'sidedrawer'} primary={item.name}/>                           
                                        </NavLink>
                                        {item.name==='Categories' ? (this.state.categorytoggle ?<ExpandLessIcon fontSize="large" className={index===this.state.activeNavIndex ? '':'sidedrawer'}  />: <ExpandMoreIcon fontSize="large" className={index===this.state.activeNavIndex ? '':'sidedrawer'} />) : null}
                                    </ListItem>
                                </div>
                                {item.name==='Categories' && categoriesNav}
                            </div>
                        )
                    })}
                </Drawer>
            </div>
        )
    }
}

export default MaterialNavbar;