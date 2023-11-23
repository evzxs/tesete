import React from "react";
import "./itemcard.css";

function ItemCard({cardId, itemId, isEditable}){
    return(
        <div className="card itemCard m-2">
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-eagle-wallpaper-nature-image_2669599.jpg" className="card-img-top img-fluid img-cartao" alt="..."/>
            <div className="card-body text-center">
                <h5 className="card-title">{cardId}</h5>
                {isEditable?
                <button type="button" className="btn btn-apagar w-100" onClick={()=>{console.log(cardId, itemId)}}>
                Apagar item
                </button>
                : null
                }
            </div>
        </div>
    )
}

export default ItemCard;