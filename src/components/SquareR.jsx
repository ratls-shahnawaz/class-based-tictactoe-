import React from 'react'
import styles from '../styles/Square.module.css'

const Square = ({value,onClick,playerX,playerY}) => {
  
    return (
        <div>
            <button 
            style={{backgroundColor: value? (value == 'X'  ? playerX : playerY) : 'white'}}
            className={styles.square}
            onClick={onClick}>
                {value?value:''}
            </button>
        </div>
    )
}

export default Square
