import React, { useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../types/Icons";

const IconPicker = ({
  value,
  onChange,
  isBreak,
}: {
  value: string;
  onChange: Function;
  isBreak: boolean;
}) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  //filter icons by search text
  const perPage = 40;
  const filteredIcons = Icons.filter((icon) =>
    icon.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const noOfPages = Math.ceil(filteredIcons.length / perPage);
  //previous Page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //next Page
  const nextPage = () => {
    if (currentPage < noOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  //select icon
  const selectIcon = (icon: string | undefined) => {
    onChange(icon);
    setIsOpen(false);
  };
  //on search
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div
        className={
          "w-24 h-24 border rounded  flex items-center justify-center  " +
          (isBreak ? "border-break" : "border-study")
        }
      >
        <div style={{ position: "absolute" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
            className={"justify-center-center"}
          >
            <FontAwesomeIcon
              size="4x"
              icon={value as IconProp}
              className={" " + (isBreak ? "text-break" : "text-study")}
              color="#5AB874"
            />
          </a>
        </div>
        {isOpen && (
          <div
            className={
              "z-10 pick-box-container border rounded bg-white pb-2 " +
              (isBreak ? "border-break" : "border-study")
            }
          >
            <div className="pick-box">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  className={
                    " pl-2 w-1/2 h-8 mt-3 mb-3 ml-2 border rounded nosubmit border-chartGrey " +
                    (isBreak ? "break" : "study")
                  }
                  type="search"
                  value={searchText}
                  onChange={onSearch}
                  placeholder="search..."
                />
                <div className="mr-6 text-h16">
                  <a
                    className="m-1"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      previousPage();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["fas", "chevron-left"]}
                      className={isBreak ? "text-break" : "text-study"}
                    />
                  </a>
                  {" " + currentPage} of {noOfPages + " "}
                  <a
                    className="m-1"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      className={isBreak ? "text-break" : "text-study"}
                    />
                  </a>
                </div>
              </div>
              <div className="bg-white">
                {filteredIcons
                  .slice((currentPage - 1) * perPage, currentPage * perPage)
                  .map((icon, index) => {
                    return (
                      <div
                        key={index}
                        className="inline-block bg-white "
                        onClick={() => selectIcon(icon.title)}
                      >
                        <div className="w-5 m-1 bg-white ">
                          <FontAwesomeIcon
                            icon={icon.title as IconProp}
                            size="lg"
                            className={
                              isBreak ? "text-break" : "text-study bg-white"
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pt-2 text-h20 text-chartGrey">select icon</div>
    </>
  );
};

export default IconPicker;
