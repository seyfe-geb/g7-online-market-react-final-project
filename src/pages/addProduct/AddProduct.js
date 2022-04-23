import react, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AddProduct.css';
import { axiosIntercepter} from "../../helper/axiosApiInstance";
import axios from "axios";

function AddProduct() {

    //const [product, setProduct] = useState({});
    const [images, setImages] = useState([{ id: 1, name: "", imageUri: "" }]);

    const formData = useRef();
    let navigate = useNavigate();

    const addFields = () => {
        const image = {
            id: images.length + 1,
            name: '',
            imageUri: ''
        };
        setImages([...images, image]);
        console.log(images);
    };

    const addProduct = () => {
        let prodImages = [];
        for (let i = 1; i <= images.length; i++) {
            const image = {
                name:formData.current['imageName-' + i].value,
                imageUri:formData.current['imageUri-' + i].value
            }
            prodImages.push(image);
        }

        let product={
            name:formData.current['name'].value,
            price:formData.current['price'].value,
            description:formData.current['description'].value,
            quantity:formData.current['quantity'].value,
            images:prodImages
        };
        console.log(product);
        
        axios.post('http://localhost:8080/products', product,{
            headers: {
              'Content-Type': 'application/json'
            }})
            .then(res =>{
                console.log(res.data);
                //setProduct(res.data);

                navigate("/seller-profile");
            })
            .catch(err =>{
                console.log(err);
            });
    }

    return (
        <div>
            <div>
                <h2>Add a Product</h2>
            </div>
            <div className="addProduct">
                <form ref={formData}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" label="name" name="name" />
                    </div>

                    <div>
                        <label htmlFor="price">Product Price</label>
                        <input type="text" label="price" name="price" />
                    </div>

                    <div>
                        <label htmlFor="description">Product Description</label>
                        <textarea placeholder="Enter your description here ..." label="description" name="description" />
                    </div>

                    <div>
                        <label htmlFor="quantity">Product Quantity</label>
                        <input type="text" label="quantity" name="quantity" />
                    </div>

                    {images.map(i => {
                        return (
                            <div key={i.id}>
                                <label>Image Name</label>
                                <input type="text" label={"imageName-" + i.id} name={"imageName-" + i.id} />
                                <label>Image Uri</label>
                                <input type="text" label={"imageUri-" + i.id} name={"imageUri-" + i.id} />
                            </div>
                        )
                    })}
                    <input type="button" value="+" onClick={() => { addFields() }} />
                </form>
                <button className="btn" onClick={() => { addProduct() }}>Add Product</button>
            </div>
        </div>
    );
    }

    export default AddProduct;