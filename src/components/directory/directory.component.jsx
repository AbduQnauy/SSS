import DirectoryItem from '../directory-item/directory-item.component'
import { CategoryContainer } from './directory.styles'

const categories = [
  {
    "id": 1,
    "title": "hat",
    "imageUrl": "https://picsum.photos/id/338/300",
    route: 'shop/hats'
  },
  {
    "id": 2,
    "title": "jacket",
    "imageUrl": "https://picsum.photos/id/669/300",
    route: 'shop/jackets'
  },
  {
    "id": 3,
    "title": "sneaker",
    "imageUrl": "https://picsum.photos/id/604/300",
    route: 'shop/sneakers'
  },
  {
    "id": 4,
    "title": "women",
    "imageUrl": "https://picsum.photos/id/21/300",
    route: 'shop/womens' 
  },
  {
    "id": 5,
    "title": "men",
    "imageUrl": "https://picsum.photos/id/1005/300",
    route: 'shop/mens'
  }
]  
const Directories = () =>{
  return(<CategoryContainer> 
      {categories.map((category, index) => (
        <DirectoryItem key={index} category={category} />
      ))}
       
    </CategoryContainer>)}

export default Directories