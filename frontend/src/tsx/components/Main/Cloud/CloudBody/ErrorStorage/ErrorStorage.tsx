
interface ErrorStorageType {
    onConfirm: () => {
        payload: number | null;
        type: "storageSlice/getStorageItems" | "adminSlice/getUserItems";
    }
}
export function ErrorStorage({onConfirm}: ErrorStorageType) {
    return (
        <section className="flex items-center justify-center flex-col flex-grow">
            <div className="text-center h-full w-full">
                <p className="text-xl text-gray-800 mb-8 font-openSans">Ой, а тут ничего нету</p>
            </div>
            <button className="p-2 text-white bg-(--color-haze)" onClick={onConfirm}>Повторить запрос</button>
        </section>
    )
}