import  { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { selectCategoriesMap, selectCategoriesIsLoadign } from '../../store/categories/category.selector'
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from '../../components/spinner/spinner.component'
import { CategoryContainer } from './category.styles.jsx'

const Category = (props) => {
    const { Category } = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoadign)
    const [products, setProducts] = useState(categoriesMap[Category])

    useEffect(() => {
      setProducts(categoriesMap[Category])}
    , [Category,categoriesMap])
    
    
    return isLoading ? <Spinner /> : <CategoryContainer>{products && products.map(product => <ProductCard key={product.id} product={product}/>)}</CategoryContainer> 
};

export default Category;
