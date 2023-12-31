import { useState } from "react"
import { useItemsContext } from "../hooks/useItemsContext"

const ItemForm = () => {
    const {dispatch} = useItemsContext()
    const [title, setTitle]= useState('')
    const [price, setPrice]= useState('')
    const [stock, setStock]= useState('')
    const [error, setError]= useState(null) 
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit= async(e) =>{
        e.preventDefault()
        const item = {title, price, stock}
        const response = await fetch('/api/items',{
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTitle('')
            setPrice('')
            setStock('')
            setError(null)
            setEmptyFields([])
            console.log('New item added.', json)
            dispatch({type:'CREATE_ITEM', payload:json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Item</h3>
            <label>Item Name:</label>
            <input
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error': ''}
                />
            
            <label>Item Price(Rupees):</label>
            <input
                type="number"
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error': ''}
                />
            <label>Item Stock:</label>
            <input
                type="number"
                onChange={(e)=> setStock(e.target.value)}
                value={stock}
                className={emptyFields.includes('stock') ? 'error': ''}
                />
            <button>Add Item</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default ItemForm;