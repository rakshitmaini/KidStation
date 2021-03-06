import React from 'react'
import {Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import {passSelectedProductAction} from '../actions/passSelectedProductAction';
import {connect} from 'react-redux';

class ProductCrudSummary extends React.Component {
    delete(id){
        const firestore = getFirestore();
        firestore.collection(this.props.product.collection.stringValue).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            window.location.reload(true);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    selectedProduct = () =>{
        console.log(this.props.product);
        this.props.passSelectedProductAction(this.props.product);

    }
    redirectToProduct = (id) =>{
        console.log("function redirect");
        window.location.href = '/cms/productcrud/'+id;
    }
    handleChangeSoldOut = () =>{
        const firestore = getFirestore();
        firestore.collection(this.props.product.collection.stringValue).doc(this.props.product.productid.stringValue).update({
            soldout: !this.props.product.soldout.booleanValue
        }).then(function() {
            console.log("Soldout value changed!");
            window.location.reload(true);
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    }
    render(){
        const {product} = this.props;
        console.log(product);
        return (
            <>
                {product && <Card className="">
                    <Link to={`/cms/productcrud/${product.productid.stringValue}`}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt={product.productname.stringValue}
                        height="140"
                        image={product.image_url.arrayValue.values[0].stringValue}
                        title={product.productname.stringValue}
                        /> 
                        <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {product.productname.stringValue}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Link>
                    <CardActions>
                        <Link to={'/cms/productcrud/'+product.productid.stringValue}>
                            <Button size="large" color="primary">
                                <i class="fa fa-edit fa-2x"/>Edit
                            </Button>
                        </Link>
                        <Button onClick={()=>this.delete(product.productid.stringValue)} size="large" color="primary">
                            <i class="fa fa-trash fa-2x"/>Delete
                        </Button>
                        <Button className="soldout-btn" color="primary">
                            <FormControlLabel
                                name="soldout"
                                checked={product.soldout.booleanValue}
                                onChange={this.handleChangeSoldOut}
                                control={<Checkbox 
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    />
                                }
                                label="Sold Out"
                                labelPlacement="end"
                            />
                        </Button>
                    </CardActions>
                </Card> }
            </>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        passSelectedProductAction: (product) => {
            dispatch(passSelectedProductAction(product))
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductCrudSummary)
