import { LoadingFunctionType } from "../components/ContainerWrapper";
import addListItemConfirm from "../components/helper/addListItemConfirm";
import dangerConfirm from "../components/helper/dangerConfirm";
import notification from "../components/helper/notification";
import BackIcon from "../components/icons/BackIcon";
import ExclamationIcon from "../components/icons/ExclamationIcon";
import InfoIcon from "../components/icons/InfoIcon";
import PenIcon from "../components/icons/PenIcon";
import SortIcon from "../components/icons/NewDataSort";
import TrashIcon from "../components/icons/TrashIcon";
import NewDataSort from "../components/icons/NewDataSort";
import SortSelectionUp from "../components/icons/SortSelectionUp";
import SortSelectionDown from "../components/icons/SortSelectionDown";
import SortAsc from "../components/icons/SortAsc";
import SortDesc from "../components/icons/SortDesc";
import UnfinishedIcon from "../components/icons/UnfinishedIcon";
import { useEffect, useRef, useState } from "react";
import SelectedIcon from "../components/icons/SelectedIcon";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

// id: 8262, title: 'dsad', activity_group_id: 23689, is_active: 0, priority: 'very-high'
type TodoItemType = {
  id: number
  title: string
  activity_group_id: string
  is_active: number
  priority: string
}

type ActivityResult = {
  created_at: string
  id: number
  title: string
  todo_items: TodoItemType[]
}

function TodoItem({ setLoading }: LoadingFunctionType) {
  //notification({icon: <InfoIcon size={24} />, text: "Gagal dihapus"})
  // dangerConfirm({ 
  //   icon: <ExclamationIcon size={84} />, 
  //   text: (<span className="text-center">apakah kamu yakin untuk mengehapus <br /><span>Meeting dengan klien ini</span>?</span>),
  //   onCancel: () => {},
  //   onConfirm: () => {}
  // });

  //addListItemConfirm()
  const navigate = useNavigate();
  const params = useParams();
  const [selection, setSelection] = useState([
    {
      icon: <SortSelectionDown size={24} />,
      text: "Terbaru",
      select: false
    },
    {
      icon: <SortSelectionUp size={24} />,
      text: "Terlama",
      select: false
    },
    {
      icon: <SortAsc size={24} />,
      text: "A-Z",
      select: false
    },
    {
      icon: <SortDesc size={24} />,
      text: "Z-A",
      select: false
    },
    {
      icon: <UnfinishedIcon size={24} />,
      text: "Belum Selesai",
      select: false
    }
  ]);
  const [activity, setActivity] = useState<ActivityResult>();

  const [titleOnChange, setTitleOnChange] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const changeActivityName = async () => {
    
    setTitleOnChange(false);
  }

  useEffect(()=>{
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  },[titleInputRef.current]);

  useEffect(()=>{
    const controller = new AbortController();
    const findTodoItem = async () => {
      if (params.item_id) {
        try {
          const {data} = await axios.get<any, AxiosResponse<ActivityResult>>(`https://todo.api.devcode.gethired.id/activity-groups/${params.item_id}`, {signal: controller.signal});
          setActivity(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {

          }
        }
      } else {
        navigate('/');
      }
    }
    findTodoItem()

    return ()=> controller.abort();
  }, [params]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4 flex-row">
          <button onClick={()=>navigate('/')}><BackIcon size={32} /></button>
          {titleOnChange && (
            <input onBlur={changeActivityName} ref={titleInputRef} className="text-[#111111] border-b border-b-black text-[28pt] font-bold focus:outline-none bg-transparent" defaultValue={activity?.title||""}/>
          )}
          {!titleOnChange && (<h1 onClick={()=> setTitleOnChange(true)} data-cy="activity-title" className="text-[#111111] text-[28pt] font-bold">{activity?.title}</h1>)}
          
          <button onClick={()=> setTitleOnChange(true)}><PenIcon size={24} /></button>
        </div>
        <div className="flex relative items-center gap-4 flex-row">
          <button><SortIcon size={54} /></button>
          <button className="bg-[#16ABF8] py-2 px-5 text-xl rounded-full text-white">+ Tambah</button>
          <div className="absolute hidden w-64 z-50 border translate-y-[160px] shadow-md rounded overflow-hidden bg-white border-[#E5E5E5]">
            {selection.map(
              (item, index) => (
                <div onClick={() => setSelection( (prev) => prev.map( (prevItem, indexItem) => ({...prevItem, select: index === indexItem}) ) )} className={`flex hover:bg-gray-100 cursor-pointer items-center py-3 gap-10 px-5 justify-between flex-row p-2${(index+1) !== selection.length ? " border-b border-b-[#E5E5E5]": ""}`} key={index}>
                  <div className="flex items-center flex-row gap-3">{item.icon} <span>{item.text}</span></div>
                  <div>{item.select && <SelectedIcon size={24} />}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-16 flex-col">
        <div className="flex flex-row px-5 items-center h-[80px] justify-between rounded-xl shadow-md bg-white">
          <div className="flex items-center flex-row">
            <input type={"checkbox"} className="w-6 h-6" />
            <div className="flex ml-5 gap-4 items-center flex-row">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Halo</span>
              <button><PenIcon size={20} /></button>
            </div>
          </div>
          <button><TrashIcon size={24} /></button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
