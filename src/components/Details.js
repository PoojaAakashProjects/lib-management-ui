import { useLocation } from "react-router"
import './Details.css'
import image from '../img/book.jpg';
const Details = () => {
    
    const location = useLocation()
    console.log('Details',location)
    return(
        <div className="detail-container">
        <img src={image}/>
        <div className="details">
            <div><span>Title:</span> {location.state.title}</div>
            <div><span>Author:</span> {location.state.author}</div>
            <div><span>Year:</span> {location.state.publicationYear}</div>
            <div><span>Genre:</span> {location.state.genre}</div>
            <div><span>Description:</span> {location.state.description}</div>
        </div>
        </div>
       
    )
}

export default Details