import { ReactElement } from "react"
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "./icons/BackIcon";

export type LoadingFunctionType = {setLoading: (val: boolean) => void, loading: boolean};
type propsType = {
  children: ReactElement
}
export default function ContainerWrapper({children}: propsType) {
  const params = useParams();
  const navigate = useNavigate();

  return (<div className="container-wrapper font-poppin-sans flex flex-col">
    <div className="flex justify-center flex-col">
        <div data-cy="header-background" className="h-[105px] px-5 bg-[#16ABF8] flex xl:justify-center items-center">
          {params?.item_id && <button className="md:hidden block" onClick={()=> navigate("/")} ><BackIcon color="white" size={32} /></button>}
          <h2 data-cy="header-title" className="flex xl:w-[1000px] text-white text-[18pt] font-bold">TO DO LIST APP</h2>
        </div>
        <main>
          <div className="flex px-5 xl:justify-center">
            <div className="flex pt-[43px] flex-col min-h-[400px] w-full xl:w-[1000px]">
              {children}
            </div>
          </div>
        </main>
      </div>
  </div>);
}