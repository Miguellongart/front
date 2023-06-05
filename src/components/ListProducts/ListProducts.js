import React, { Fragment, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './ListProducts.module.css';

function ListProducts({ setProducts, products }) {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get('search');
    const [visibleProducts, setVisibleProducts] = useState(4);
    // console.log(products)
    const showMoreProducts = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/items?q=${searchParam}`);
            const data = await response.json();
            setItems(data.items);
            setCategories(data.categories)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    // console.log(categories)
    // console.log(items)
    useEffect(() => {
        fetchProducts();
    }, [searchParam]);

    useEffect(() => {
        setItems(products.items);
        setCategories(products.categories)
    }, [products]);

    function formatPrice(price) {
        if (typeof price !== 'number') {
            return price;
        }
        return price.toLocaleString();
    }

    return (
        <div className={styles.container}>
            <Search setProducts={setProducts} />
            <div className={styles.categoriesContent}>
                {categories?.length > 0 &&
                    categories?.map((category, index) => (
                    <Fragment key={index}>
                        <span className={styles.categories}>{category}</span>
                        {index < categories?.length - 1 && <span className={styles.categories}> > </span>}
                    </Fragment>
                ))}
            </div>
            <div className={styles.content}>
                {items?.slice(0, visibleProducts).map((item, index) => (
                    <div className={styles.product} key={index}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.image} src={item.picture} alt={item.title} />
                        </div>
                        <div className={styles.details}> 
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>{`${item.price.currency} ${formatPrice(item.price.amount)}`}</span>
                                {item.free_shipping && <strong className={styles.freeShipping}>envio gratis</strong>}
                            </div>
                            <Link to={`/items/${item.id}`} className={styles.title}>
                                {item.title}
                            </Link>
                        </div>
                    </div>
                ))}
                {visibleProducts < items?.length && (
                    <button className={styles.showMoreButton} onClick={showMoreProducts}> Siguientes 4</button>
                )}
            </div>
        </div>
    );
}

export default ListProducts;
