import './Header.css'
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useState } from 'react'
import { logoutUser } from '../../redux/slice/FormSlice/FormSlice'
export function Header() {
    const {userInfo} = useAppSelector(state => state.form)
    const [logoutBtn, setLogoutBtn] = useState(false)
    const onClick = () => setLogoutBtn(prev => !prev)
    const dispatch = useAppDispatch()
    const onLogoutClick = () => {
        dispatch(logoutUser())
        setLogoutBtn(false)
    }
    return (
        <header className="bg-gray-200 z-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="p-0">
                    <Link to="/" className="flex items-center py-1">
                        <img src="src/img/haze.png" alt="" width='50px' height='50px' />
                        <span className="ml-2 font-(family-name:--font-roboto) font-medium text-lg">Haze Cloud</span>
                    </Link>
                </div>
                <div className="flex justify-center p-0 gap-x-2">
                    <Link className="nav-link hover-border group" to="/">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="group-hover:fill-blue-400" d="M0 1H6L9 4H16V14H0V1Z" fill="#000000"></path> </g></svg>
                        <span className='dropdown-nav-block bottom-[-40px] z-999'>Хранилище</span>
                    </Link>
                    <Link className="nav-link hover-border group" to="/about">
                        <svg className="group-hover:fill-(--color-haze)" version="1.1" id="svg2" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1200 1200" enableBackground="new 0 0 1200 1200" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path10706" d="M596.847,188.488c-103.344,0-187.12,97.81-187.12,218.465 c0,83.678,40.296,156.352,99.468,193.047l-68.617,31.801l-182.599,84.688c-17.64,8.821-26.444,23.778-26.444,44.947 c0,67.034,0,134.067,0,201.102c1.451,25.143,16.537,48.577,40.996,48.974h649.62c27.924-2.428,42.05-24.92,42.325-48.974 c0-67.034,0-134.068,0-201.102c0-21.169-8.804-36.126-26.443-44.947l-175.988-84.688l-73.138-34.65 c56.744-37.521,95.061-108.624,95.061-190.197C783.967,286.298,700.19,188.488,596.847,188.488L596.847,188.488z M295.023,265.312 c-44.473,1.689-79.719,20.933-106.497,51.596c-29.62,36.918-44.06,80.75-44.339,124.354c1.819,64.478,30.669,125.518,82.029,157.446 L21.163,693.997C7.05,699.289,0,711.636,0,731.041v161.398c1.102,21.405,12.216,39.395,33.055,39.703h136.284V761.436 c2.255-45.639,23.687-82.529,62.196-100.531l136.247-64.817c10.584-6.175,20.731-14.568,30.433-25.152 c-56.176-86.676-63.977-190.491-27.773-281.801C346.895,274.724,320.432,265.463,295.023,265.312L295.023,265.312z M903.609,265.312 c-29.083,0.609-55.96,11.319-78.039,26.444c35.217,92.137,25.503,196.016-26.482,276.52c11.467,13.23,23.404,23.377,35.753,30.434 l130.965,62.195c39.897,21.881,60.47,59.098,60.866,100.532v170.707h140.235c23.063-1.991,32.893-20.387,33.093-39.704V731.042 c0-17.641-7.05-29.987-21.163-37.045l-202.431-96.618c52.498-38.708,78.859-96.72,79.369-156.117 c-1.396-47.012-15.757-90.664-44.339-124.354C981.57,284.509,944.526,265.655,903.609,265.312L903.609,265.312z"></path> </g></svg>
                        <span className='dropdown-nav-block bottom-[-40px] z-999'>О нас</span>
                    </Link>
                    {userInfo && userInfo!.is_staff 
                    && <Link className="nav-link hover-border group" to="/admin">
                            <svg className="group-hover:fill-red-600" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.811 472.811"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M414.763,308.966c-5.547,0-10.696,1.519-15.15,4.115c-1.633,0.956-3.715,0.516-4.825-1.01l-44.236-60.429 c-6.643-9.071-6.643-21.401,0-30.472l44.221-60.414c1.111-1.526,3.208-1.965,4.841-1.008c4.438,2.596,9.603,4.13,15.15,4.13 c16.818,0,30.458-13.626,30.458-30.45c0-16.816-13.64-30.442-30.458-30.442c-16.8,0-30.441,13.625-30.441,30.442 c0,1.888-1.417,3.468-3.299,3.668l-74.354,8.084c-11.175,1.219-21.856-4.947-26.388-15.229l-30.226-68.482 c-0.757-1.719-0.094-3.738,1.526-4.678c9.124-5.263,15.273-15.082,15.273-26.341c0-16.816-13.641-30.45-30.456-30.45 c-16.802,0-30.443,13.633-30.443,30.45c0,11.259,6.15,21.078,15.26,26.341c1.635,0.94,2.282,2.952,1.526,4.678l-30.21,68.475 c-4.531,10.289-15.214,16.455-26.389,15.236l-74.356-8.084c-1.879-0.201-3.297-1.78-3.297-3.668 c0-16.816-13.642-30.442-30.457-30.442c-16.802,0-30.441,13.625-30.441,30.442c0,16.824,13.64,30.45,30.441,30.45 c5.564,0,10.712-1.534,15.166-4.13c1.649-0.957,3.729-0.524,4.841,1.008l44.221,60.414c6.628,9.071,6.628,21.401,0,30.472 l-44.236,60.429c-1.109,1.526-3.206,1.966-4.841,1.018c-4.454-2.604-9.587-4.123-15.15-4.123c-16.802,0-30.441,13.624-30.441,30.442 c0,16.824,13.64,30.45,30.441,30.45c16.815,0,30.457-13.626,30.457-30.45c0-1.912,1.418-3.491,3.297-3.692l74.356-8.085 c11.175-1.218,21.857,4.948,26.389,15.236l30.21,68.475c0.756,1.719,0.093,3.737-1.526,4.678 c-9.109,5.264-15.26,15.081-15.26,26.341c0,16.817,13.642,30.45,30.443,30.45c16.815,0,30.456-13.632,30.456-30.45 c0-11.26-6.149-21.077-15.273-26.341c-1.62-0.941-2.283-2.96-1.526-4.678l30.226-68.483c4.531-10.28,15.213-16.446,26.388-15.228 l74.354,8.085c1.882,0.201,3.299,1.788,3.299,3.692c0,16.824,13.642,30.45,30.441,30.45c16.818,0,30.458-13.626,30.458-30.45 C445.221,322.59,431.581,308.966,414.763,308.966z"></path> </g></svg>
                            <span className='dropdown-nav-block bottom-[-40px] z-999'>Администратор</span>
                        </Link>}
                </div>
                <div className='border-l-1 border-black p-0'>
                    {userInfo != null
                    ? <div className='py-[10px] px-4 flex justify-center gap-x-15 items-center relative'>
                        <img className='w-[35px] h-[35px] block' src="src/img/171.png" alt="" />
                        <span className='ml-[-40px] text-base'>{userInfo.username}</span>
                        <div>
                            <button onClick={onClick} className='user-dropdown-btn'></button>
                            <div className={`dropdown-block ${logoutBtn && 'dropdown-block-active'}`}>
                                <ul className="p-0 m-0">
                                    <li className='font-medium text-center py-1'>
                                        <button onClick={onLogoutClick} className='p-1.5 rounded cursor-pointer bg-red-500 text-white'>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : <div className="flex justify-center items-center gap-x-5.5 pl-9 pr-4 py-[10px]">
                        <Link to="/login" className="auth-btns">Log In</Link>
                        <Link to="/registration" className="auth-btns">Sign Up</Link>
                    </div>
                    }
                </div>
            </div>
        </header>
    )
}