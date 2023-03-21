import { useEffect} from 'react';
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import CategoryPreview from "../../components/category-preview/category-preview.component"
import { selectCategoriesMap } from '../../store/categories/category.selector'
import { fetchCategoriesStart } from '../../store/categories/category.action'

const Shop = (props) => {
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(fetchCategoriesStart())
}, [])

  const categoriesMap = useSelector(selectCategoriesMap)
  return (
    <Routes>
    <Route index element={<CategoriesPreview />}/>
    {
      Object.keys(categoriesMap).map((title,i) =>
      <Route key={i} path={title} element={<CategoryPreview title={title} products={categoriesMap[title]} fullList/>}/>
      )
    }
    </Routes>
    )
};

export default Shop;
