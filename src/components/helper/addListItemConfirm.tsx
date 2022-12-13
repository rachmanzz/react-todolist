import { ReactElement } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirm.css';

type confirmDangerType = {
  icon: ReactElement
  text: ReactElement
  onConfirm?: () => void
  confirmText?: string
}
const ConfirmTemplate = () => (
  <div className="flex rounded-lg overflow-hidden  flex-col shadow-lg  bg-white sm:min-w-[400px] md:min-w-[700px]">
    <div className="flex justify-between flex-row py-5 px-5 border-b border-b-gray-200">
      <h4 className="font-bold text-xl">Tambah List Item</h4>
      <button>x</button>
    </div>
    <div className="flex flex-col py-4 px-5 border-b border-b-gray-200">
      <div className="flex flex-col">
        <label className="text-xs font-bold py-2">NAMA ITEM LIST</label>
        <input className="w-full border rounded border-gray-200 p-2" />
      </div>
      <div className='flex mt-8 flex-col'>
        <label className="text-xs font-bold py-2">PRIORITY</label>
        <div>
          <select className="border rounded border-gray-200 px-2 py-3">
            <option value="very-hight">Very Hight</option>
            <option value="hight">Hight</option>
            <option value="hight">Medium</option>
            <option value="hight">Low</option>
            <option value="hight">Very Low</option>
          </select>
        </div>
      </div>
    </div>
    <div className="flex py-4 px-5 justify-end flex-row h-[88px] gap-4">
      {<button className=" px-8 shadow text-white bg-[#16ABF8] rounded-full">Simpan</button>}
    </div>
  </div>
)

export default () => {
  confirmAlert({
    customUI: () => (<ConfirmTemplate/>)
  });
}