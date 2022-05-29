import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import dayjs from "dayjs";

import { Form, Input } from "lib/forms";
import { Offer, OfferOption } from "lib/properties/types";
import { Button, Spinner } from "lib/shared-ui";

interface ModalProps {
  offer: Offer;
  options: OfferOption[];
  updateHandler: (status: string | null, offer: Offer, date?: string) => void;
}

interface MutationData {
  date?: string;
  status: string;
  id?: number;
}

interface OptionProps {
  label: string;
  value: string;
  desc?: string;
}

export const SharedPopover: React.FC<ModalProps> = ({
  offer,
  options,
  updateHandler,
}) => {
  const [status, setStatus] = React.useState<string | null>("");
  const date: string = React.useMemo(
    () => offer.viewingAt || new Date().toString(),
    [offer]
  );
  const methods = useForm();

  const mutation = useMutation(async (data: MutationData) => {
    await updateHandler(data.status, offer, data?.date);
  });

  const handleStatus = (status: string) => {
    setStatus(status);
    if (status !== "viewing_requested") {
      mutation.mutate({ status });
    }
  };

  React.useEffect(() => {
    setStatus(offer.status);
  }, [offer]);

  return (
    <Popover className="relative">
      <Popover.Button
        className={`
                ${!open ? "" : "relative text-opacity-90"}
                group inline-flex h-full items-center rounded-md px-3 py-0 sm:px-6 sm:py-2 text-sm  sm:text-base text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white
                `}
      >
        <span>Set Status</span>
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute min-w-[300px] -left-14 sm:-left-1/2 z-10 p-3 shadow-lg -translate-x-1/2 transform px-4 sm:px-0 max-w-3xl">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white lg:grid-cols-2">
              <Form
                onSubmit={(data) => {
                  mutation.mutate({
                    ...data,
                    status,
                  });
                }}
                methods={methods}
              >
                {mutation.isLoading && (
                  <div className="absolute inset-0 z-50 bg-gray-500 bg-opacity-40 transition-opacity">
                    <div className="flex items-center justify-center h-full ">
                      <Spinner />
                    </div>
                  </div>
                )}
                {options.map((option: OptionProps) => (
                  <label
                    key={option.label}
                    className="relative p-4 flex cursor-pointer focus:outline-none"
                  >
                    <input
                      type="radio"
                      checked={option.value === status}
                      onClick={() => handleStatus(option.value)}
                      name="privacy-setting"
                      value="Private to Project Members"
                      className="h-4 w-4 mt-0.5 cursor-pointer shrink-0 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      aria-labelledby="privacy-setting-1-label"
                      aria-describedby="privacy-setting-1-description"
                    />
                    <span className="ml-3 flex flex-col">
                      <span
                        id="privacy-setting-1-label"
                        className="block text-sm font-medium"
                      >
                        {option.label}
                      </span>
                      <span
                        id="privacy-setting-1-description"
                        className="block text-sm"
                      >
                        {option.desc}
                      </span>
                    </span>
                  </label>
                ))}
                {status === "viewing_requested" && (
                  <div className="flex flex-col pb-5 px-5 gap-2">
                    <Input
                      id="date"
                      type="datetime-local"
                      defaultValue={dayjs(date).format("YYYY-MM-DDTHH:mm")}
                      rules={{ required: true }}
                    />
                    <Button className="w-full" type="submit" variant="primary">
                      Update Viewing Time
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
