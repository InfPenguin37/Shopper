import { useItemsContext } from "../hooks/useItemsContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ItemDetails = ({item}) => {
    const { dispatch } = useItemsContext()

    const handleClick = async() =>{
        const response = await fetch('/api/items/'+ item._id,{
            method: 'DELETE'
        })
        const json = await response.json() 

        if (response.ok){
            dispatch({type: 'DELETE_ITEM', payload: json})
        }
    }
    return (
        <div className="item-details">
            <h3>{item.title}</h3>
            <p><strong>Price(Rupees):</strong>{item.price}</p>
            <p><strong>Available:</strong>{item.stock}</p>
            <p>{formatDistanceToNow(new Date(item.createdAt),{addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}
 
export default ItemDetails;