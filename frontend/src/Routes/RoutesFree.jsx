import { Routes, Route } from 'react-router-dom'
import Authentication from '../pages/Authentication/Authentication';


export default function RoutesFree() {
    return(
        <Routes>
            <Route exact path="/authentication" element={<Authentication />} />
        </Routes>
    )
}