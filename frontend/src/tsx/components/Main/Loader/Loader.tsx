import './Loader.css'
export function Loader() {
    return (
        <div className="flex justify-center flex-grow items-center h-[80%]">
            <div className="relative w-50 h-50">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
                <div className="circle circle4"></div>
                <div className="circle circle5"></div>
                <div className="circle circle6"></div>
                <div className="circle circle7"></div>
                <div className="circle circle8"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-[44%] -translate-y-[44%] w-40 h-40 rounded-full bg-cover bg-[url('src/img/haze-circle.png')]"></div>
            </div>
        </div>
    )
}