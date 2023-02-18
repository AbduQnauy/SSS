import { useContext} from 'react';
import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from "../../components/category-preview/category-preview.component"

const Shop = (props) => {
  const {categoriesMap} = useContext(CategoriesContext)
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
