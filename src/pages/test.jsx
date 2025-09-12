

export default function TestPage() {
	
	return(
		<div className="w-[400px] h-[400px] bg-green-200 relative">
			<div className="w-[200px] h-[200px] bg-red-400 z-[-50] absolute top-0 left-0 right-0 bottom-0 m-auto"></div>
			<div className="w-[200px] h-[200px] bg-blue-400 z-[0] absolute top-0 left-0 right-0 bottom-0 m-auto"></div>
		</div>
	)
}