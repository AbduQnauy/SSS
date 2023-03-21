import { createAction } from '../../utils/reducer/reducer.utils'



export const fetchCategoriesStart = () => createAction('FETCH_CATEGORIES_START') 
export  const fetchCategoriesSuccess = (categoriesArray) => createAction('FETCH_CATEGORIES_SUCCESS', categoriesArray) 

export  const fetchCategoriesFailed  = (error) => createAction('FETCH_CATEGORIES_FAILED', error) 

