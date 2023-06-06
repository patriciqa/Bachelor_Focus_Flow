import CustomButton from "@/component/CustomButton";
import { ButtonVariant } from "@/component/icon/ButtonList";
import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import EditView from "@/component/timer/EditView";
import { editElement, getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import ModalPage from "./ModalPage";

export default function ReasonsOverview({ good }: { good: boolean }) {
  const [studyReasons, setStudyReasons] = useState<Reason[]>();
  const reasons: Reason[] = [];
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeReason, setActiveReason] = useState<Reason>();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const getPhases = async (): Promise<Reason[]> => {
    const a = (await getElement("reasons", "all").then((result) => {
      return result;
    })) as Reason[];
    return a;
  };

  useEffect(() => {
    getPhases().then((c: Reason[]) => {
      c.forEach((p) => {
        if (good) {
          if (p.goodReason) {
            reasons.push(p);
            setStudyReasons(reasons);
          }
        } else {
          if (!p.goodReason) {
            reasons.push(p);
            setStudyReasons(reasons);
          }
        }
      });
    });
  }, [studyReasons]);

  return (
    <div className="flex flex-col items-center w-full h-full px-6">
      <div className="relative mb-2 h-[58px] w-[70%] flex justify-center items-center bg-chartGrey rounded-2xl">
        <button
          onClick={() => setActive(true)}
          className={
            "w-[52%] rounded-2xl left-0  absolute text-white  h-[60px] font-medium  " +
            (active && "bg-dark rounded  z-10 ")
          }
        >
          active
        </button>
        <button
          onClick={() => setActive(false)}
          className={
            "w-[52%] rounded-2xl right-0 absolute text-white h-[60px] font-medium  " +
            (!active && "bg-dark rounded z-10 ")
          }
        >
          inactive
        </button>
      </div>
      <div className="h-[65%] relative w-full py-4 overflow-auto mb-4 ">
        <div className="text-left text-chartGrey text-h14">
          {active
            ? "edit, archive or create new causes"
            : "archived causes won’t be shown in the list anymore"}
        </div>
        {studyReasons !== undefined &&
          studyReasons.map((p) => (
            <>
              {active ? (
                <>
                  {p.archived === false && (
                    <Menu>
                      {({ open }) => (
                        <>
                          <Menu.Button className="flex w-full py-2 font-medium">
                            <button
                              onClick={() => {
                                setActiveReason(p);
                              }}
                              className="flex justify-between w-full text-left "
                            >
                              {initialRenderComplete && (
                                <>
                                  <TextWithIcon
                                    variant={ButtonVariant.STUDY}
                                    icon={p.icon}
                                    text={p.title}
                                  />
                                  <FontAwesomeIcon
                                    icon={["fas", "ellipsis-vertical"]}
                                    size="xl"
                                    className={"pr-4 " + (open && "invisible")}
                                  />
                                </>
                              )}
                            </button>
                          </Menu.Button>
                          <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Menu.Items
                              static
                              className="absolute right-0 z-10 w-40 mt-2 bg-white border rounded shadow-lg border-study "
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        setOpenEdit(true);
                                        setOpenModal(true);
                                      }}
                                      className={`block px-4 py-2 text-left w-full`}
                                    >
                                      edit
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        const a = { ...p };
                                        a.archived = true;
                                        setActiveReason(a);
                                        if (p.id !== undefined) {
                                          editElement("reasons", p.id, a);
                                        }
                                      }}
                                      className={`w-full block text-left px-4 py-2 `}
                                    >
                                      set to inactive
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  )}
                </>
              ) : (
                <>
                  {p.archived === true && (
                    <Menu>
                      {({ open }) => (
                        <>
                          <Menu.Button className="flex w-full py-2 font-medium">
                            <button
                              onClick={() => {
                                setActiveReason(p);
                              }}
                              className="flex justify-between w-full text-left "
                            >
                              {initialRenderComplete && (
                                <>
                                  <TextWithIcon
                                    variant={ButtonVariant.STUDY}
                                    icon={p.icon}
                                    text={p.title}
                                  />
                                  <FontAwesomeIcon
                                    icon={["fas", "ellipsis-vertical"]}
                                    size="xl"
                                    className={"pr-4 " + (open && "invisible")}
                                  />
                                </>
                              )}
                            </button>
                          </Menu.Button>
                          <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Menu.Items
                              static
                              className="absolute right-0 z-10 w-40 mt-2 bg-white border rounded shadow-lg border-study "
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        setOpenEdit(true);
                                        setOpenModal(true);
                                      }}
                                      className={`block px-4 py-2 text-left w-full`}
                                    >
                                      edit
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        const a = { ...p };
                                        a.archived = false;
                                        setActiveReason(a);
                                        if (p.id !== undefined) {
                                          editElement("reasons", p.id, a);
                                        }
                                      }}
                                      className={`w-full block text-left px-4 py-2 `}
                                    >
                                      set to active
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  )}
                </>
              )}
            </>
          ))}
      </div>

      <div className="absolute flex items-end justify-center bottom-[3%] ">
        {active && (
          <CustomButton
            variant="dark"
            onClick={() => {
              setOpen(true);
            }}
          >
            add cause
          </CustomButton>
        )}
      </div>
      <ModalPage
        open={open}
        setOpen={setOpen}
        component={
          <CreateView
            setOpen={setOpen}
            isBreak={false}
            goodReason={good ? true : false}
          />
        }
      />
      {activeReason !== undefined && (
        <ModalPage
          open={openEdit}
          setOpen={setOpenEdit}
          component={
            <EditView
              isBreak={false}
              setOpen={setOpenEdit}
              goodReason={good ? true : false}
              activeEntry={activeReason}
            />
          }
        />
      )}
    </div>
  );
}
