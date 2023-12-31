import { ItemContext } from "../context/ItemContext";
import { useContext } from "react";

export const useItemsContext = () => {
    const context = useContext(ItemContext)

    if (!context) {
        throw Error('useItemsContext must be used inside an ItemsContextProvider')
    }

    return context
}