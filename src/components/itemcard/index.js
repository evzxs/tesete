import React from "react";
import "./itemcard.css";

function ItemCard(){
    return(
        <div class="card m-2">
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-eagle-wallpaper-nature-image_2669599.jpg" class="card-img-top img-fluid img-cartao" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    )
}

export default ItemCard;