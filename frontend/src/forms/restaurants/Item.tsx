import { MdDelete } from "react-icons/md";
type Props = {
  id: number;
  name: string;
  price: number | undefined;
  removeElement: (id: number) => void;
  changeNameHandel: (id: number, value: string) => void;
  changePriceHandel: (id: number, value: number) => void;
};

const Item = ({
  id,
  name,
  price,
  removeElement,
  changeNameHandel,
  changePriceHandel,
}: Props) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeNameHandel(id, e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePriceHandel(id, Number(e.target.value));
  };

  return (
    <div className="flex gap-3">
      <label htmlFor="">
        <span className={`my-2 block  font-medium text-slate-600`}>Name</span>
        <input
          className=" bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 border-slate-400 focus:border-blue-600"
          name="name"
          value={name}
          required
          onChange={handleNameChange}
        />
      </label>
      <label
        htmlFor="
            "
      >
        <span className={`my-2 block  font-medium text-slate-600`}>Price</span>

        <input
          name="price"
          className=" bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 border-slate-400 focus:border-blue-600"
          value={price}
          type="number"
          required
          onChange={handlePriceChange}
        />
      </label>
      <button
        type="button"
        className=" bg-red-500 text-white p-4  rounded-lg  font-semibold self-end"
        onClick={() => {
          removeElement(id);
        }}
      >
        <MdDelete className=" text-2xl" />
      </button>
    </div>
  );
};

export default Item;
