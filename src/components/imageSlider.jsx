
import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [activeImage, setActiveImage]= useState(0)

    return(
        <div className="w-[400px]  ">
            <img className="w-full h-[400px] object-cover" src={images[activeImage]}/>
            <div className="w-full h-[100px] flex justify-center items-center gap-2">
                {
                    images.map(
                        (img, index)=>{
                            return(
                                <img onClick={()=>{
                                    setActiveImage(index)
                                }} key={index} className={"w-[90px] h-[90px] object-cover "+(activeImage == index && "border-[4px] border-accent")} src={img}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}