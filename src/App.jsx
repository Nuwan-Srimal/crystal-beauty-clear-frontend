
import './App.css'
import ProductCard from './components/productCard'

function App() {
  

  return (
    <>

    <ProductCard name="Apple iPad" price="$499" image="https://www.apple.com/assets-www/en_WW/ipad/product_tile/xlarge/ipad_pro_f1345e8ae.png"/>

    <ProductCard name="Apple Watch" price="$399" image="https://www.apple.com/v/watch/br/images/overview/select/product_se__c83w8hz9gre6_large.png"/>
    
    <ProductCard name="Mac Book Pro" price="$1299" image="https://www.apple.com/assets-www/en_WW/mac/product_tile/xlarge/mba_13_15_2fb165671.png"/>
    </>
  )
}

export default App
