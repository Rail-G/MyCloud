export function Main() {
    return (
        <main className="flex-grow bg-gray-50">
            <div className="container mx-auto pt-6 px-10 flex flex-col gap-5 h-[calc(100vh-98px)]">
                <section className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button className="transition-all duration-300 flex items-center gap-2 p-2 rounded hover:bg-(--color-haze-600) hover:text-white border cursor-pointer group">
                            <svg className="group-hover:fill-white duration-300" fill="#000000" width='22px' height='22px' viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1451.06 557.963C1456.76 557.07 1462.44 556.179 1468.24 556.179C1717.38 556.179 1920 761.2 1920 1013.31C1920 1265.41 1717.38 1470.43 1468.24 1470.43H1355.29V1356.15H1468.24C1655.04 1356.15 1807.06 1202.33 1807.06 1013.31C1807.06 824.283 1655.04 670.46 1468.24 670.46C1467.28 670.46 1466.34 670.632 1465.41 670.803C1464.48 670.975 1463.55 671.146 1462.59 671.146C1463.2 676.832 1463.97 682.485 1464.73 688.143C1466.48 701.135 1468.24 714.146 1468.24 727.601C1468.24 772.4 1462.48 816.855 1451.29 859.825L1342.08 830.569C1350.78 797.084 1355.29 762.571 1355.29 727.601C1355.29 507.038 1177.98 327.616 960 327.616C747.558 327.616 574.871 498.581 566.287 711.373C604.574 730.115 640.602 753.772 671.887 784.628L592.941 866.339C539.746 813.77 469.609 784.742 395.294 784.742C239.661 784.742 112.941 912.852 112.941 1070.45C112.941 1228.04 239.661 1356.15 395.294 1356.15H564.706V1470.43H395.294C177.318 1470.43 0 1291.01 0 1070.45C0 849.883 177.318 670.46 395.294 670.46C416.188 670.46 436.631 673.203 456.847 676.517C482.598 417.098 697.073 213.334 960 213.334C1181.82 213.334 1368.85 358.7 1438.08 559.607C1442.45 559.312 1446.76 558.637 1451.06 557.963ZM717.572 1282.27L637.722 1201.47L960.056 875.31L1282.28 1201.47L1202.43 1282.27L1016.53 1094.16V1813.33H903.586V1094.16L717.572 1282.27Z"></path> </g></svg>
                            <span className="text-base">Загрузить</span>
                        </button>
                        <button className="transition-all duration-300 flex items-center gap-2 p-2 rounded hover:bg-(--color-haze-600) hover:text-white border cursor-pointer group">
                            <svg className="group-hover:fill-white duration-300" fill="#000000" width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m764.386 112.941 225.882 338.824H1920v1185.882c0 88.213-67.799 160.913-154.016 168.718l-15.396.694H169.412c-88.214 0-160.913-67.799-168.718-154.016L0 1637.647V112.941h764.386Zm-60.537 112.941H112.941v1411.765c0 27.708 20.079 50.776 46.354 55.56l10.117.91h1581.176c27.608 0 50.754-19.989 55.557-46.324l.914-10.146V564.706H225.882V451.765H854.4L703.85 225.882Zm312.622 564.706v282.353h282.353v112.941H1016.47v282.353H903.529v-282.353H621.176v-112.94H903.53V790.587h112.942Z" fill-rule="evenodd"></path> </g></svg>
                            <span className="text-base">Создать папку</span>
                        </button>
                    </div>
                    <div className="border rounded py-2 px-3">
                        <label className="flex items-center cursor-pointer">
                            <svg fill="#000000" width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path> </g></svg>
                            <input className="outline-0 ml-2" type="text" placeholder="Найти" />
                        </label>
                    </div>
                </section>
                <section className="w-full h-full">
                    <h2 className="text-xl font-bold mb-5">File Manager</h2>
                    <div className="flex flex-col justify-between h-[calc(100%-40px)]">
                        <div className="grid grid-cols-[repeat(6,183.5px)] auto-rows-[225px] gap-5 w-full mx-auto mb-6">
                            <div className="bg-white hover:shadow-md cursor-pointer px-5 py-5">
                                <svg className="mx-auto" width="120px" height="120px" viewBox="0 -3.5 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90909 0H11.2834C12.4407 0 13.5506 0.459739 14.369 1.27808L14.7219 1.63101C15.5402 2.44935 16.6502 2.90909 17.8074 2.90909H23.2727C24.0761 2.90909 24.7617 3.1931 25.3297 3.76115C25.8977 4.32918 26.1818 5.01487 26.1818 5.81818V21.8182C26.1818 22.6215 25.8977 23.3072 25.3297 23.8752C24.7617 24.4432 24.0761 24.7273 23.2727 24.7273H2.90909C2.10576 24.7273 1.42009 24.4432 0.852052 23.8752C0.284017 23.3072 0 22.6215 0 21.8182V2.90909C0 2.10576 0.284017 1.42009 0.852052 0.852052C1.42009 0.284017 2.10576 0 2.90909 0Z" fill="url(#paint0_linear_103_1791)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81818 21.8182V8.72727C5.81818 7.92395 6.1022 7.23827 6.67024 6.67023C7.23827 6.1022 7.92395 5.81818 8.72727 5.81818H29.0909C29.8942 5.81818 30.5799 6.1022 31.1479 6.67023C31.716 7.23827 32 7.92395 32 8.72727V21.8182C32 22.6215 31.716 23.3072 31.1479 23.8752C30.5799 24.4432 29.8942 24.7273 29.0909 24.7273H2.90909C3.71241 24.7273 4.3981 24.4432 4.96612 23.8752C5.53417 23.3072 5.81818 22.6215 5.81818 21.8182Z" fill="url(#paint1_linear_103_1791)"></path> <defs> <linearGradient id="paint0_linear_103_1791" x1="16" y1="0" x2="16" y2="16.3543" gradientUnits="userSpaceOnUse"> <stop stop-color="#FBA200"></stop> <stop offset="1" stop-color="#FF7300"></stop> </linearGradient> <linearGradient id="paint1_linear_103_1791" x1="17.4545" y1="5.81818" x2="17.4545" y2="24.7273" gradientUnits="userSpaceOnUse"> <stop stop-color="#FAC227"></stop> <stop offset="1" stop-color="#FAA627"></stop> </linearGradient> </defs> </g></svg>
                                <div className="text-center mt-2">
                                    <h2 className="font-medium">Папка номер 1 </h2>
                                    <p className="text-xs">22.03.2025, 16:42 </p>
                                </div>
                            </div>
                            <div className="bg-white hover:shadow-md cursor-pointer px-5 py-5">
                                <div className="relative mb-2">
                                    <svg className="mx-auto" width="120px" height="120px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file-document</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd"> <g id="Icon-Set" transform="translate(-154.000000, -99.000000)" fill="#fbda7e"> <path d="M174,107 C172.896,107 172,106.104 172,105 L172,101 L178,107 L174,107 L174,107 Z M178,127 C178,128.104 177.104,129 176,129 L158,129 C156.896,129 156,128.104 156,127 L156,103 C156,101.896 156.896,101 158,101 L169.972,101 C169.954,103.395 170,105 170,105 C170,107.209 171.791,109 174,109 L178,109 L178,127 L178,127 Z M172,99 L172,99.028 C171.872,99.028 171.338,98.979 170,99 L158,99 C155.791,99 154,100.791 154,103 L154,127 C154,129.209 155.791,131 158,131 L176,131 C178.209,131 180,129.209 180,127 L180,109 L180,107 L172,99 L172,99 Z" id="file-document"> </path> </g> </g> </g></svg>
                                    <span className="absolute w-28.5 rounded p-2 bg-(--color-file) top-12 left-3.5 text-center text-white text-xl font-bold">TXT</span>
                                </div>
                                <div className="text-center">
                                    <h2 className="font-medium">observation.txt</h2>
                                    <p className="text-xs">22.03.2025, 16:42 </p>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="flex justify-center">
                            <button className="border px-2.5 py-2 mb-6 cursor-pointer rounded transition-all duration-300 hover:bg-(--color-haze-600) hover:text-white">More</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}