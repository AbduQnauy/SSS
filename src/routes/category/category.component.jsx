import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer } from './category.styles.jsx'

const Category = (props) => {
    const { Category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[Category])

    useEffect(() => setProducts(categoriesMap[Category])
    , [Category,categoriesMap])
    
  
    return (
      <CategoryContainer>
      {products && products.map(product => <ProductCard key={product.id} product={product}/>)}      
      </CategoryContainer>
     
  )
};

export default Category;
