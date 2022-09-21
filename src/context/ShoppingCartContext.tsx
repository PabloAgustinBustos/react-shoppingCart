import React, { createContext, ReactNode, useContext, useState } from 'react'

// tipo del contexto. Defino los estados y funciones que seran globales
type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void,

    cartQuantity: number,
    cartItems: CartItem[]
}

// creo el contexto y lo defino con el tipo
const ShoppingCartContext= createContext({} as ShoppingCartContext)

// hook que retorna el contexto. De esta forma no hace falta importar el contexto ni el useContext en los componentes
const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

// tipo del objeto props del componente provider
type ShoppingCartProviderProps = {
    children: ReactNode
}

// estructura de cáda item
type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const getItemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0;
    
    const increaseCartQuantity = (id: number) => {
        setCartItems(prev => {
            if(!prev.some(item => item.id === id)){         // si no existe el item en el carrito
                return [                                    // retorna el array con el nuevo item
                    ...prev,
                    {id, quantity:1}
                ]
            }else{                                          // pero si existe
                return prev.map(item => {                   // me retorna el mismo array pero mapeando para que cambie el quantity del item determinado
                    if(item.id === id){
                        return {
                            ...item,
                            quantity: item.quantity + 1     // encontró el item, lo incrementa
                        }
                    }else{
                        return item                         // si no es el que quería, entonces retorna item normal como está
                    }
                })

                // otra manera de escribirlo
                return prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item)
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(prev => {
            if(prev.find(item => item.id === id)?.quantity === 1){          // busco el item y compruebo si es igual a 1
                return prev.filter(item => item.id !== id)                  // si es igual a 1, lo elimino
            }else{
                return prev.map(item => {
                    if(item.id === id){
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }else{
                        return item
                    }
                })

                // otra manera de escribirlo
                return prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item)
            }
        })
    }

    const removeFromCart = (id: number) => setCartItems(prev => prev.filter(item => item.id !== id))

    return <ShoppingCartContext.Provider value={{
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart, 
        cartItems, 
        cartQuantity, 
        openCart, 
        closeCart
    }}>
        {children}
    </ShoppingCartContext.Provider>
}

export{
    ShoppingCartProvider,
    useShoppingCart
}