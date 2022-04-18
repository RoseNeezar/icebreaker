import { Link, useLocation } from "react-router-dom";
// import BaseButton from "../../junbi-shared/components/BaseButton";
import Devices from "../../../assets/bg.svg";

const Landing = () => {
  const location = useLocation();
  return (
    <div className="h-screen bg-right bg-cover  bg-dark-main">
      <div className="container w-full p-6 mx-auto">
        <div className="flex items-center justify-between w-full">
          <a
            className="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl"
            href="https://twitter.com/intent/tweet?url=#"
          >
            <svg
              className="h-8 pr-2 text-indigo-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
            </svg>{" "}
            Junbi
          </a>

          <div className="flex content-center justify-end w-1/2">
            <a
              className="inline-block h-10 p-2 text-center text-indigo-500 no-underline hover:text-dark-third hover:underline md:h-auto md:p-4"
              data-tippy-content="@twitter_handle"
              href="https://twitter.com/intent/tweet?url=#"
            >
              <svg
                className="h-8 fill-current "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container flex flex-col flex-wrap items-center px-6 pt-24 mx-auto md:pt-48 md:flex-row ">
        <div className="flex flex-col justify-center w-full overflow-y-hidden xl:w-2/5 lg:items-start">
          <h1 className="my-4 text-3xl font-bold leading-tight text-center md:text-5xl text-dark-txt md:text-left slide-in-bottom-h1">
            Junbi
          </h1>
          <p className="mb-8 text-base leading-normal text-center text-dark-txt md:text-2xl md:text-left slide-in-bottom-subtitle">
            Collection of productive applications with emphasis on preparedness
          </p>
          <div className="flex justify-center w-full pb-24 md:justify-start lg:pb-0 fade-in">
            <Link
              className="w-32 h-12 p-3 mr-4 font-bold tracking-widest text-center bg-dark-third text-dark-txt bounce-top-icons hover:bg-dark-second rounded-2xl"
              to="/app"
            >
              Go to app
            </Link>
          </div>
        </div>

        <div className="w-full py-6 overflow-y-hidden xl:w-3/5">
          <img
            className="w-5/6 mx-auto lg:mr-0 slide-in-bottom"
            src={Devices}
            alt="_"
          />
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
        <div className="no-underline text-dark-txt hover:no-underline">
          &copy; Kanban App 2022
        </div>
      </div>
    </div>
  );
};

export default Landing;
