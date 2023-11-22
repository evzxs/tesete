import React from "react";
import "./itemcard.css";

function ItemCard(){
    return(
        <div class="card itemCard m-2">
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-eagle-wallpaper-nature-image_2669599.jpg" class="card-img-top img-fluid img-cartao" alt="..."/>
            <div class="card-body text-center">
                <h5 class="card-title">Card title</h5>
                <button type="button" className="btn btn-apagar w-100">
                Apagar item
                </button>
            </div>
        </div>
    )
}

export default ItemCard;