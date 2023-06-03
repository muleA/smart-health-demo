/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface ReportProps {
    number?: string | number;
    icon?: any;
    text?: string;
    className?: string;
    iconBackGround?: string;
  }
  const Report = (props: ReportProps) => {
    return (
      <div
        className={`group flex cursor-pointer  items-center space-x-4 ${props?.className}`}
      >
        <div
          className={`flex h-full items-center justify-center self-center text-primary group-hover:text-white`}
        >
          {props?.icon}
        </div>
        <div className="my-2 w-full flex-col justify-center space-y-2">
          <div className="text-xl font-bold text-white md:text-primary md:group-hover:text-white">
            {props?.number}
          </div>
          <div
            className="h-8 text-white md:text-gray-600 md:group-hover:text-white"
            style={{ fontFamily: 'Raleway' }}
          >
            {props?.text}
          </div>
        </div>
      </div>
    );
  };
  export default Report;
  