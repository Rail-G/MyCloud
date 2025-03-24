import './CloudBody.css'
export function CloudBody() {
    return (
        <section className="w-full h-full">
            <h2 className="text-xl font-bold mb-5">File Manager</h2>
            <div className="flex flex-col justify-between h-[calc(100%-40px)]">
                <div className="grid grid-cols-[repeat(6,183.5px)] auto-rows-[225px] gap-5 w-full mx-auto mb-6">
                    <div className="bg-white hover:shadow-md cursor-pointer px-5 py-5">
                        <svg className="mx-auto" width="120px" height="120px" viewBox="0 -3.5 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2.90909 0H11.2834C12.4407 0 13.5506 0.459739 14.369 1.27808L14.7219 1.63101C15.5402 2.44935 16.6502 2.90909 17.8074 2.90909H23.2727C24.0761 2.90909 24.7617 3.1931 25.3297 3.76115C25.8977 4.32918 26.1818 5.01487 26.1818 5.81818V21.8182C26.1818 22.6215 25.8977 23.3072 25.3297 23.8752C24.7617 24.4432 24.0761 24.7273 23.2727 24.7273H2.90909C2.10576 24.7273 1.42009 24.4432 0.852052 23.8752C0.284017 23.3072 0 22.6215 0 21.8182V2.90909C0 2.10576 0.284017 1.42009 0.852052 0.852052C1.42009 0.284017 2.10576 0 2.90909 0Z" fill="url(#paint0_linear_103_1791)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5.81818 21.8182V8.72727C5.81818 7.92395 6.1022 7.23827 6.67024 6.67023C7.23827 6.1022 7.92395 5.81818 8.72727 5.81818H29.0909C29.8942 5.81818 30.5799 6.1022 31.1479 6.67023C31.716 7.23827 32 7.92395 32 8.72727V21.8182C32 22.6215 31.716 23.3072 31.1479 23.8752C30.5799 24.4432 29.8942 24.7273 29.0909 24.7273H2.90909C3.71241 24.7273 4.3981 24.4432 4.96612 23.8752C5.53417 23.3072 5.81818 22.6215 5.81818 21.8182Z" fill="url(#paint1_linear_103_1791)"></path> <defs> <linearGradient id="paint0_linear_103_1791" x1="16" y1="0" x2="16" y2="16.3543" gradientUnits="userSpaceOnUse"> <stop stopColor="#FBA200"></stop> <stop offset="1" stopColor="#FF7300"></stop> </linearGradient> <linearGradient id="paint1_linear_103_1791" x1="17.4545" y1="5.81818" x2="17.4545" y2="24.7273" gradientUnits="userSpaceOnUse"> <stop stopColor="#FAC227"></stop> <stop offset="1" stopColor="#FAA627"></stop> </linearGradient> </defs> </g></svg>
                        <div className="text-center mt-2">
                            <h2 className="font-medium">Папка номер 1 </h2>
                            <p className="text-xs">22.03.2025, 16:42 </p>
                        </div>
                    </div>
                    <div className="bg-white hover:shadow-md cursor-pointer px-5 py-5">
                        <div className="relative mb-2">
                            <svg className="mx-auto" width="120px" height="120px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file-document</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Icon-Set" transform="translate(-154.000000, -99.000000)" fill="#fbda7e"> <path d="M174,107 C172.896,107 172,106.104 172,105 L172,101 L178,107 L174,107 L174,107 Z M178,127 C178,128.104 177.104,129 176,129 L158,129 C156.896,129 156,128.104 156,127 L156,103 C156,101.896 156.896,101 158,101 L169.972,101 C169.954,103.395 170,105 170,105 C170,107.209 171.791,109 174,109 L178,109 L178,127 L178,127 Z M172,99 L172,99.028 C171.872,99.028 171.338,98.979 170,99 L158,99 C155.791,99 154,100.791 154,103 L154,127 C154,129.209 155.791,131 158,131 L176,131 C178.209,131 180,129.209 180,127 L180,109 L180,107 L172,99 L172,99 Z" id="file-document"> </path> </g> </g> </g></svg>
                            <span className="file-img-text">TXT</span>
                        </div>
                        <div className="text-center">
                            <h2 className="font-medium">observation.txt</h2>
                            <p className="text-xs">22.03.2025, 16:42 </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}