

type Props={
    file:File | string,
    setFile:(f:any)=>void
}


const File = ({file,setFile}:Props) => {
    console.log(file)
    return (
        <div className='space-y-2 mb-8'>
            <div className='pb-6'>
                <h3 className='text-2xl font-semibold'>Image</h3>
                <p className='text-sm text-slate-500'>Select your image</p>
            </div>
            <div className="border-2 border-solid border-black p-3 rounded-lg w-fit">
                <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e)=>{
                        setFile(e.target.files?.[0])
                    }}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white cursor-pointer"
                />
            </div>

        </div>
    );
};

export default File;



