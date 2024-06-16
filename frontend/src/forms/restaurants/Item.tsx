import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
type Props = {
    id: number;
    name: string,
    price: number | undefined,
    removeElement: (id: number) => void,
    changeNameHandel:(id: number, value: string) => void,
    changePriceHandel:(id: number, value: number) => void
}

const Item = ({ id, name, price, removeElement, changeNameHandel, changePriceHandel }: Props) => {
   

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeNameHandel(id,e.target.value)
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changePriceHandel(id,Number(e.target.value))
    };

    return (
        <div className="flex gap-3">
            <TextField
                label="Name"
                name="name"
                value={name}
                required
                onChange={handleNameChange}
            />
            <TextField
                label="Price"
                name="price"
                value={price}
                type='number'
                required
                onChange={handlePriceChange}
            />
            <button className=" bg-red-500 text-white px-4  rounded-lg  font-semibold" onClick={()=>{
                removeElement(id)
            }}><DeleteIcon/></button>
        </div>
    );
}

export default Item;
