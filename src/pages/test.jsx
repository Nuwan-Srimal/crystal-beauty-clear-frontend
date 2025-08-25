import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";


export default function TestPage() {
	const [file, setfile] = useState(null);    
    
    async function uploadImage(){
		
		const link = await mediaUpload(file)
		console.log(link);

		
	}


	return (
		<div className="w-full h-full flex justify-center items-center">
				<input type="file" onChange={
					(e)=>{
						setfile(e.target.files[0])
					}
				}/>
				<button className="bg-blue-500 text-white p-2 rounded" onClick={uploadImage}>
					Upload
				</button>
		</div>
	);
}