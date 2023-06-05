import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './ItemDetail.module.css';

function ItemDetail({setProducts}) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    // console.log(id)
    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${id}`);
            const data = await response.json();
            // console.log(data)
            setProduct(data.item);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    function formatPrice(price) {
        if (typeof price !== 'number') {
            return price;
        }
        return price.toLocaleString();
    }

    if (!product) {
        return <>
            <Search setProducts={setProducts}/>
            <div>Cargando...</div>
        </>
    }
    // console.log(product)
    return (
        <div className={styles.container}>
            <Search setProducts={setProducts} />
            <div className={styles.categoriesContent}>
                
            </div>
            <div className={styles.content}>
                <div className={styles.product}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.image} src={product.picture} alt={product.title} />
                    </div>
                    <div className={styles.details}> 
                        <h3 className={styles.title}>
                            {product.title}
                        </h3>
                        <div className={styles.priceContainer}>
                            <h2 className={styles.price}>{`${product.price.currency} ${formatPrice(product.price.amount)}`}</h2>
                        </div>
                        <div className={styles.priceContainer}>
                            <button className={styles.button}>Comprar</button>
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <h3>Descripcion del producto</h3>
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
