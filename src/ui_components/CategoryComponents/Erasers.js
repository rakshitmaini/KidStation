import React from 'react'
import '../../styles/header_banner.css';
import HeaderBanner from '../BaseComponent/HeaderBanner';
import {fetchProduct} from '../../CMS/actions/UploadAction';
import {connect} from 'react-redux';
import eraser_banner from '../../images/eraser_banner.jpg';
import ProductCard from '../BaseComponent/ProcuctCard';


class Eraser extends React.Component {
    componentWillMount = () =>{
        this.props.fetchProduct();
    }
    render(){
        const {erasers} = this.props;
        console.log(erasers);
        return(
        <>
            <HeaderBanner tag="Erasers & Sharpners" bannerImg={`url(${eraser_banner})`} />
            <ProductCard data={erasers}/>
        </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    let eraserData = [];
    state.products.length!=0 && state.products.map((product,index)=>{
        product.collection.stringValue == 'erasers' && eraserData.push(product);
    })
    return { 
        erasers: eraserData
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProduct: () => {
            dispatch(fetchProduct())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Eraser);