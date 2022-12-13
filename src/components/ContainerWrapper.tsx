import { ReactElement, useState } from "react"

export type LoadingFunctionType = {setLoading: (val: boolean) => void, loading: boolean};
type propsType = {
  children: (props: LoadingFunctionType) => ReactElement
}
export default function ContainerWrapper({children}: propsType) {
  const [loading, setLoading] = useState(false);

  return (<div className="container-wrapper font-poppin-sans flex flex-col">
    {loading ? "Loading..." : (
      <div className="flex justify-center flex-col">
        <div className="h-[105px] px-5 bg-[#16ABF8] flex xl:justify-center items-center">
          <h2 data-cy="header-title" className="flex xl:w-[1000px] text-white text-[18pt] font-bold">TO DO LIST APP</h2>
        </div>
        <main>
          <div className="flex px-5 xl:justify-center">
            <div className="flex pt-[43px] flex-col xl:w-[1000px]">
              {children({setLoading, loading})}
            </div>
          </div>
        </main>
      </div>
    )}
  </div>);
}