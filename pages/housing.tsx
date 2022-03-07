import * as React from "react";

import { BaseLayout } from "lib/layouts";
import { Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as Heart } from "@heroicons/react/outline";

interface mockInterface {
  name: string;
  img: string;
  desc: string;
  price: string;
  selected: Array<number>;
  id: number;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

const mockData: Array<mockInterface> = Array(10).fill({
  name: "Jan van Galenstraat 307 1",
  img: "https://cloud.funda.nl/valentina_media/153/654/707_720x480.jpg",
  desc: "1056 CB Amsterdam",
  price: "€ 1,695 p/mo.",
});

const Item: React.FC<mockInterface> = ({
  price,
  setSelected,
  selected,
  name,
  img,
  desc,
  id,
}) => {
  return (
    <div className="cursor-pointer mt-3 flex w-full gap-10 border-b pb-5 border-gray-500">
      <img src={img} alt={desc} className="h-36" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="hover:text-slate-700 text-base font-semibold text-slate-400">
            {name}
          </h3>
          <h4 className="hover:text-gray-900  text-sm font-normal text-black-500">
            {desc}
          </h4>
          <p className="m-0 text-sm font-bold text-black-900">{price}</p>
        </div>
        <div>
          {selected.includes(id) ? (
            <HeartIcon
              className={`h-6 w-6 ml-2 cursor-pointer`}
              onClick={() =>
                setSelected((prevState: Array<number>) =>
                  prevState.filter((idx: number) => idx !== id)
                )
              }
            />
          ) : (
            <Heart
              className="h-6 w-6 ml-2 cursor-pointer"
              onClick={() =>
                setSelected((prevState: Array<number>) => [...prevState, id])
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Wrapper: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
  }, []);

  return (
    <BaseLayout>
      <div className="flex-1 w-full flex p-4 w-100 h-100">
        <Transition
          show={show}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 "
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 scale-95 "
          className="w-full"
        >
          <main className="transition-all w-full flex-1px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-28">
            {mockData.map(({ name, desc, img, price }, index: number) => (
              <Item
                key={index}
                id={index}
                price={price}
                selected={selected}
                name={name}
                setSelected={setSelected}
                desc={desc}
                img={img}
              />
            ))}
          </main>
        </Transition>
      </div>
    </BaseLayout>
  );
};

export default Wrapper;
