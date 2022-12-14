import React, {useEffect, useMemo, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CevronDown from '../icons/CevronDown';
import SelectedIcon from '../icons/SelectedIcon';
import './confirm.css';

type TodoType = {
  title: string
  priority: string
}

type confirmAddTodoType = {
  onConfirm: (val: TodoType, onClose: () => void, onComplate: () => void) => void
  defValue?: string
  defPriority?: string
}

interface confirmTplType extends confirmAddTodoType {
  onClose: () => void
}
const ConfirmTemplate = ({ onClose, onConfirm, defPriority, defValue }: confirmTplType) => {
  const [title, setTitle] = useState<string>(defValue || "");
  const [isOpenSelect, setOpenSelect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [priorityOpt, setPriorityOpt] = useState([
    {
      label: "Very High",
      value: "very-high",
      color: "#ED4C5C",
      selected: !defPriority ? true : defPriority === "very-high" ? true : false
    },
    {
      label: "High",
      value: "high",
      color: "#F8A541",
      selected: defPriority && defPriority === "high" ? true : false
    },
    {
      label: "Medium",
      value: "normal",
      color: "#00A790",
      selected: defPriority && defPriority === "normal" ? true : false
    },
    {
      label: "Low",
      value: "low",
      color: "#428BC1",
      selected: defPriority && defPriority === "low" ? true : false
    },
    {
      label: "Very Low",
      value: "very-low",
      color: "#8942C1",
      selected: defPriority && defPriority === "very-low" ? true : false
    }
  ]);
  

  // ref 
  const selectOptRef = useRef<HTMLDivElement>(null);

  // memo / callback
  const selectedPriority = useMemo(()=> priorityOpt.filter(item => item.selected)[0], [priorityOpt]);

  // function
  const changeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val);
  }
  const onButtonConfirmClick = () => {
    setProgress(true);
    onConfirm({title, priority: selectedPriority.value}, onClose, () => {setProgress(false)});
  }

  useEffect(()=> {
    const handleOutSide = (event: MouseEvent) => {
      if (selectOptRef.current && !selectOptRef.current.contains(event.target as any)){
        setOpenSelect(false);
      }
    }
    document.addEventListener("mousedown", handleOutSide);
  }, [selectOptRef]);

  
  return (
    <div data-cy="modal-add-item" className="flex rounded-lg flex-col shadow-lg  bg-white sm:min-w-[400px] md:min-w-[700px]">
      <div className="flex justify-between flex-row py-5 px-5 border-b border-b-gray-200">
        <h4 className="font-bold text-xl">Tambah List Item</h4>
        <button onClick={onClose}>x</button>
      </div>
      <div className="flex flex-col py-4 px-5 border-b border-b-gray-200">
        <div className="flex flex-col">
          <label className="text-xs font-bold py-2">NAMA ITEM LIST</label>
          <input onChange={changeTitleValue} value={title} placeholder="Tambah nama Item" className="w-full border rounded border-gray-200 p-2" />
        </div>
        <div className='flex mt-8 flex-col'>
          <label className="text-xs font-bold py-2">PRIORITY</label>
          <div className="flex">
            {/* <select onChange={changeTodoValue("priority")} value={todo.priority} className="border flex w-full md:w-auto leading-tight rounded border-gray-200  py-3">
              <option value="very-high">Very High</option>
              <option value="high">High</option>
              <option value="normal">Medium</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
            </select> */}
            <div className="relative w-full z-40 h-16">
              <div className="absolute w-full md:w-[230px]">
                <button onClick={() => setOpenSelect(prev => !prev)} className={`border w-full border-[#E5E5E5] gap-7 inline-flex justify-between px-3 py-2 ${isOpenSelect ? "rounded-t bg-[#E5E5E5]" : "rounded"}`}>
                  <div className="inline-flex gap-3 items-center"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedPriority.color }} /> {selectedPriority.label}</div>
                  <CevronDown className={(isOpenSelect && "rotate-180") || "rotate-0"} size={24} />
                </button>
                {isOpenSelect &&
                  (<div style={{ zIndex: 99 }} ref={selectOptRef} className="flex flex-col border-x border-x-[#E5E5E5] overflow-hidden bg-white border-b border-b-[#E5E5E5] rounded-b">
                    {priorityOpt.map(
                      (item, index) => (
                      <div onClick={() => setPriorityOpt( (prev) => prev.map( (v, optIndex) => ({...v, selected: optIndex === index}) ) )} className={`py-2 px-2 justify-between cursor-pointer items-center inline-flex gap-4 ${(index+1) !== priorityOpt.length && "border-b border-b-[#E5E5E5]" }`} key={item.value}>
                        <div className="inline-flex items-center font-poppin-sans gap-2">
                          <div style={{ backgroundColor: item.color }} className={`w-3 h-3 rounded-full`} />
                          {item.label}
                          </div>
                          <div>{item.selected && <SelectedIcon size={24} />}</div>
                      </div>
                      )
                    )}
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-4 px-5 justify-end flex-row h-[88px] gap-4">
        {<button disabled={title === ""} onClick={onButtonConfirmClick} className={`px-8 shadow text-white bg-[#16ABF8] rounded-full${title === "" || progress ? " bg-opacity-25" : ""}`}>Simpan</button>}
      </div>
    </div>
  )
}

export default function addListItemConfirm(props: confirmAddTodoType) {
  confirmAlert({
    customUI: ({ onClose }) => (<ConfirmTemplate onClose={onClose} {...props} />)
  });
}