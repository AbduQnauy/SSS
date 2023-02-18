import { Outlet } from 'react-router-dom'
import Directories from '../../components/directory/directory.component'

const Home = () => <div>
        <Outlet />
        <Directories />
    </div>
  

export default Home