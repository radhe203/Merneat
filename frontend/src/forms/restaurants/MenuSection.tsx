import Item from "./Item";

type Props = {
  Menu: {
    _id: number;
    name: string;
    price: number | undefined;
  }[];
  setMenu: (any: any) => void;
};

function MenuSection({ Menu, setMenu }: Props) {
  function removeElement(id: number) {
    if (Menu.length <= 1) {
      return;
    }
    const filtered = Menu.filter((menu: any) => menu._id !== id);
    setMenu(filtered);
  }

  function changePriceHandel(id: number, value: number) {
    const updatedMenu = Menu.map((item) => {
      if (item._id === id) {
        return { ...item, price: value };
      }
      return item;
    });
    setMenu(updatedMenu);
  }

  function changeNameHandel(id: number, value: string) {
    const updatedMenu = Menu.map((item) => {
      if (item._id === id) {
        return { ...item, name: value };
      }
      return item;
    });
    setMenu(updatedMenu);
  }
  return (
    <div className=" space-y-2 mb-8">
      <div className=" pb-6">
        <h3 className=" text-2xl font-semibold">Menu item</h3>
        <p className=" text-sm text-slate-500">
          {" "}
          Create your menu and give each item a price
        </p>
      </div>
      {Menu.map((elem) => (
        <Item
          key={elem._id}
          name={elem.name}
          id={elem._id}
          price={elem.price}
          removeElement={removeElement}
          changeNameHandel={changeNameHandel}
          changePriceHandel={changePriceHandel}
        />
      ))}

      <button
        className=" bg-black text-white px-3 py-2 rounded-lg  font-semibold"
        onClick={() => {
          setMenu([
            ...Menu,
            { _id: Menu.length - 1 + 1, name: "", price: undefined },
          ]);
        }}
      >
        Add More
      </button>
    </div>
  );
}

export default MenuSection;
