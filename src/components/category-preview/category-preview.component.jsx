import React from "react"
import { CategoryPreviewContainer, Preview, Title} from './category-preview.styles'
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({title, products, fullList}) => (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {
            fullList ? products?.map((product) =><ProductCard key={product.id} product={product} />) :
                       products?.filter((_, idx) => idx < 4)
                               .map((product) =><ProductCard key={product.id} product={product} />)
        }
      </Preview>
    </CategoryPreviewContainer>
  )

export default CategoryPreview;
