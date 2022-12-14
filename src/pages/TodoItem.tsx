import addListItemConfirm from "../components/helper/addListItemConfirm";
import BackIcon from "../components/icons/BackIcon";
import PenIcon from "../components/icons/PenIcon";
import SortIcon from "../components/icons/NewDataSort";
import TrashIcon from "../components/icons/TrashIcon";
import SortSelectionUp from "../components/icons/SortSelectionUp";
import SortSelectionDown from "../components/icons/SortSelectionDown";
import SortAsc from "../components/icons/SortAsc";
import SortDesc from "../components/icons/SortDesc";
import UnfinishedIcon from "../components/icons/UnfinishedIcon";
import React, { useEffect, useRef, useState } from "react";
import SelectedIcon from "../components/icons/SelectedIcon";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import LoadingIcon from "../components/icons/LoadingIcon";
import notification from "../components/helper/notification";
import InfoIcon from "../components/icons/InfoIcon";
import dangerConfirm from "../components/helper/dangerConfirm";
import ExclamationIcon from "../components/icons/ExclamationIcon";
import DivWrapper from "../components/DivWrapper";
import EmptyTodo from "../components/svg/EmptyTodo";

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
  email?: string
  updated_at?: string
}

const priorityColor = (val: string) => {
  const opt = [
    {
      value: "very-high",
      color: "#ED4C5C",
    },
    {
      value: "high",
      color: "#F8A541",
    },
    {
      value: "normal",
      color: "#00A790",
    },
    {
      value: "low",
      color: "#428BC1"
    },
    {
      value: "very-low",
      color: "#8942C1"
    }
  ];
  const selected = opt.filter(item => item.value === val);
  return selected.length === 1 ? selected[0].color : "#eee";
}

const errorNotification = (text: string) => notification({ icon: <ExclamationIcon size={24} />, text });
const infoNotification = (text: string) => notification({ icon: <InfoIcon size={24} />, text });

type btnActionProp = {
  container?: React.HTMLAttributes<HTMLDivElement>
  onCreateTodo?: () => void
  onSortSelection?: (sort: string) => void
}
const ButtonAction = ({ container, onCreateTodo, onSortSelection }: btnActionProp) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sortOpt, setSortOpt] = useState(false);
  const [selection, setSelection] = useState([
    {
      icon: <SortSelectionDown size={24} />,
      text: "Terbaru",
      value: "terbaru",
      select: true
    },
    {
      icon: <SortSelectionUp size={24} />,
      text: "Terlama",
      value: "terlama",
      select: false
    },
    {
      icon: <SortAsc size={24} />,
      text: "A-Z",
      value: "a-z",
      select: false
    },
    {
      icon: <SortDesc size={24} />,
      text: "Z-A",
      value: "z-a",
      select: false
    },
    {
      icon: <UnfinishedIcon size={24} />,
      text: "Belum Selesai",
      value: "unfinished",
      select: false
    }
  ]);

  const onSelectionSelect = (index: number, val: string) => () => {
    setSortOpt(false);
    onSortSelection && onSortSelection(val);
    setSelection((prev) => prev.map((prevItem, indexItem) => ({ ...prevItem, select: index === indexItem })));
  }

  useEffect(() => {
    const handleOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        setSortOpt(false);
      }
    }
    document.addEventListener("mousedown", handleOutSide);
  }, [ref]);

  return (
    <div {...container}>
      <button data-cy="todo-sort-button" onClick={() => setSortOpt(prev => !prev)}><SortIcon size={54} /></button>
      <button data-cy="todo-add-button" onClick={onCreateTodo} className="bg-[#16ABF8] py-2 px-5 text-xl rounded-full text-white">+ Tambah</button>
      {
        sortOpt && (
          <div ref={ref} className="absolute w-64 z-50 border translate-y-[160px] shadow-md rounded overflow-hidden bg-white border-[#E5E5E5]">
            {selection.map(
              (item, index) => (
                <div data-cy="sort-selection" onClick={onSelectionSelect(index, item.value)} className={`flex hover:bg-gray-100 cursor-pointer items-center py-3 gap-10 px-5 justify-between flex-row p-2${(index + 1) !== selection.length ? " border-b border-b-[#E5E5E5]" : ""}`} key={index}>
                  <div className="flex items-center flex-row gap-3">{item.icon} <span>{item.text}</span></div>
                  <div>{item.select && <SelectedIcon size={24} />}</div>
                </div>
              )
            )}
          </div>
        )
      }
    </div>)
}
function TodoItem() {
  const navigate = useNavigate();
  const params = useParams();

  const [activity, setActivity] = useState<ActivityResult>();

  const [titleOnChange, setTitleOnChange] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [onContentLoaded, setOnContentLoaded] = useState(false);

  const changeActivityName = async () => {
    if (titleInputRef.current && titleInputRef.current.value !== activity?.title && !(/^$|^\s+$/.test(titleInputRef.current.value))) {
      try {
        const title = titleInputRef.current.value;
        setActivity(prev => ({ ...prev!, title }));
        setTitleOnChange(false);
        await axios.patch<any, AxiosResponse<Partial<ActivityResult>>>(`https://todo.api.devcode.gethired.id/activity-groups/${params.item_id}`, { title });
      } catch (error) {
        setTitleOnChange(false);
      }
    } else {
      setTitleOnChange(false);
    }
  }

  const syncTodoItem = async () => {
    if (params.item_id) {
      try {
        const { data } = await axios.get<any, AxiosResponse<ActivityResult>>(`https://todo.api.devcode.gethired.id/activity-groups/${activity?.id}`);
        setActivity(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 404) {
            errorNotification("Activity tidak ditemukan");
            return
          }
        }
        errorNotification("Gagal memuat Activity");
      }
    } else {
      navigate('/');
    }
  }

  const onCreateItem = () => addListItemConfirm({
    onConfirm: async (data, onClose, onComplate) => {
      try {
        await axios.post(`https://todo.api.devcode.gethired.id/todo-items`, { ...data, activity_group_id: params.item_id })
        syncTodoItem()
        onClose()
        onComplate()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 400) {
            errorNotification("Field tidak boleh kosong");
            return
          }
        }
        errorNotification("Gagal membuat todo item");
        onClose()
        onComplate()
      }
    }
  });
  const onIpdateItem = (id: number, defValue: string, defPriority: string) => () => addListItemConfirm({
    onConfirm: async (data, onClose, onComplate) => {
      try {
        await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, { ...data })
        setActivity(prev => ({
          ...prev!,
          todo_items: prev!.todo_items.map((item) => item.id === id ? ({ ...item, ...data }) : (item))
        }));

        onClose()
        onComplate()
        infoNotification("Item berhasil diupdate")
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 404) {
            errorNotification("Todo Item tidak ditemukan");
            return
          }
        }
        errorNotification("Gagal memuat update item");
        onClose()
        onComplate()
      }
    },
    defValue,
    defPriority
  })

  const onCheckUpItem = (id: number, is_active: number, index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setActivity(prev => ({
        ...prev!,
        todo_items: prev!.todo_items.map((item, prevIndex) => ({ ...item, is_active: index === prevIndex ? is_active : item.is_active }))
      }));
      await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, { is_active });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 404) {
          errorNotification("Todo item tidak ditemukan");
          return
        }
      }
      errorNotification("Gagal update todo item");
      setActivity(prev => ({
        ...prev!,
        todo_items: prev!.todo_items.map((item, prevIndex) => ({ ...item, is_active: index === prevIndex ? (is_active ? 0 : 1) : item.is_active }))
      }));
    }
  }

  const onDeleteItem = (item: TodoItemType) => () => dangerConfirm(
    {
      icon: <ExclamationIcon size={80} />,
      text: (
        <div className="flex flex-col items-center">
          <span>Apakah anda yakin menghapus item</span>
          <div><span className=" font-bold">"{item.title}"</span> ?</div>
        </div>
      ),
      onCancel: (close) => close(),
      onConfirm: async (onClose, onComplate) => {
        try {
          await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${item.id}`);
          setActivity(prev => ({
            ...prev!,
            todo_items: prev!.todo_items.filter((prevItem) => prevItem.id !== item.id)
          }));
          onComplate();
          onClose();
          notification({ icon: <InfoIcon size={24} />, text: "Activity berhasil dihapus" })
        } catch (error) {
          if (axios.isAxiosError(error)) {
            onComplate();
            onClose();
            if (error.status === 404) {
              notification({ icon: <ExclamationIcon size={24} />, text: "Data tidak ditemukan" })
            } else {
              notification({ icon: <ExclamationIcon size={24} />, text: "Terjadi kesalahan, silahkan ulangi lagi" })
            }
          }
        }
      }

    }
  )

  const sortOptSelected = (val: string) => {
    if (activity) {
      setActivity(prev => {
        const next = prev?.todo_items.sort(
          (a, b) => {
            if (val === "terlama") return a.id - b.id;
            if (val === "a-z") return a.title.localeCompare(b.title);
            if (val === "z-a") return b.title.localeCompare(a.title);
            if (val === "unfinished") return b.is_active - a.is_active;
            return b.id - a.id;
          }
        );
        return { ...prev!, todo_items: next! }
      })
    }
  }

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [titleInputRef]);

  useEffect(() => {
    const controller = new AbortController();
    const findTodoItem = async () => {
      if (params.item_id) {
        try {
          const { data } = await axios.get<any, AxiosResponse<ActivityResult>>(`https://todo.api.devcode.gethired.id/activity-groups/${params.item_id}`, { signal: controller.signal });
          setActivity(data);
          setOnContentLoaded(true);
        } catch (error) {
          if (axios.isAxiosError(error)) {

          }
        }
      } else {
        navigate('/');
      }
    }
    findTodoItem()

    return () => controller.abort();
  }, [params, navigate]);
  return (
    <div className="flex flex-col">
      {onContentLoaded && (
        <React.Fragment>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-4 flex-row">
              <button data-cy="todo-back-button" className="hidden md:block" onClick={() => navigate('/')}><BackIcon size={32} /></button>
              {titleOnChange && (
                <input data-cy="todo-input-title" onBlur={changeActivityName} ref={titleInputRef} className="text-[#111111] border-b border-b-black text-[28pt] font-bold focus:outline-none bg-transparent" defaultValue={activity?.title || ""} />
              )}
              <div className="inline-flex justify-between w-full gap-3 md:w-auto">
                {!titleOnChange && (<h1 data-cy="todo-title" onClick={() => setTitleOnChange(true)} className="text-[#111111] text-[28pt] font-bold">{activity?.title}</h1>)}

                <button data-cy="todo-title-edit-button" onClick={() => setTitleOnChange(true)}><PenIcon size={24} /></button>
              </div>
            </div>
            {/* <div className="flex relative items-center gap-4 flex-row justify-end">
              <button><SortIcon size={54} /></button>
              <button onClick={onCreateItem} className="bg-[#16ABF8] py-2 px-5 text-xl rounded-full text-white">+ Tambah</button>
              <div className="absolute hidden w-64 z-50 border translate-y-[160px] shadow-md rounded overflow-hidden bg-white border-[#E5E5E5]">
                {selection.map(
                  (item, index) => (
                    <div onClick={() => setSelection((prev) => prev.map((prevItem, indexItem) => ({ ...prevItem, select: index === indexItem })))} className={`flex hover:bg-gray-100 cursor-pointer items-center py-3 gap-10 px-5 justify-between flex-row p-2${(index + 1) !== selection.length ? " border-b border-b-[#E5E5E5]" : ""}`} key={index}>
                      <div className="flex items-center flex-row gap-3">{item.icon} <span>{item.text}</span></div>
                      <div>{item.select && <SelectedIcon size={24} />}</div>
                    </div>
                  )
                )}
              </div>
            </div> */}
            <ButtonAction onSortSelection={sortOptSelected} onCreateTodo={onCreateItem} container={{ className: "flex relative items-center gap-4 flex-row justify-end" }} />
          </div>
          <div className="flex gap-4 mt-16 pb-10 flex-col">
            {activity?.todo_items.map(
              (item, index) => (
                <div key={index} data-cy="todo-item" className="flex flex-row px-5 items-center h-[80px] justify-between rounded-xl shadow-md bg-white">
                  <div className="flex items-center flex-row">
                    <input data-cy="todo-item-checkbox" onChange={onCheckUpItem(item.id, item.is_active ? 0 : 1, index)} checked={!item.is_active} type={"checkbox"} className="w-6 h-6" />
                    <div className="flex ml-5 gap-4 items-center flex-row">
                      <span style={{ backgroundColor: priorityColor(item.priority) }} className="w-3 h-3 rounded-full"></span>
                      <span data-cy="todo-title" className={(!item.is_active ? "line-through text-gray-300" : "")}>{item.title}</span>
                      <button onClick={onIpdateItem(item.id, item.title, item.priority)}><PenIcon size={20} /></button>
                    </div>
                  </div>
                  <button data-cy="todo-item-delete-button" onClick={onDeleteItem(item)}><TrashIcon size={24} /></button>
                </div>
              )
            )}
          </div>
          {activity?.todo_items.length === 0 && (<DivWrapper paddings={[1, 5, 1, 5]} className="flex cursor-pointer my-10">
            {([width]) => (
              <div onClick={onCreateItem}>
                <EmptyTodo width={width >= 768 ? width - 100 : width} />
              </div>
            )}
          </DivWrapper>)}
        </React.Fragment>
      )}
      {!onContentLoaded && (
        <div className="flex flex-row justify-center pt-20"><LoadingIcon color="#16ABF8" size={40} /></div>
      )}
    </div>
  );
}

export default TodoItem;
