const Spinner = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
            <div className="h-12 w-12 rounded-full border-t-2 border-white border-opacity-80 animate-spin">
            </div>
        </div>
    );
}

export default Spinner;