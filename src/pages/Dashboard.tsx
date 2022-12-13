import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingFunctionType } from "../components/ContainerWrapper";
import dangerConfirm from "../components/helper/dangerConfirm";
import notification from "../components/helper/notification";
import ExclamationIcon from "../components/icons/ExclamationIcon";
import TrashIcon from "../components/icons/TrashIcon";


type ActivityType = {
  created_at: string
  id: number
  title: string
}
type ActivityResult = {
  limit: number
  skip: number
  total: number
  data: ActivityType[]
}
function Dashboard({ setLoading }: LoadingFunctionType) {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const navigate = useNavigate();

  const deleteConfirm = (item: ActivityType) => () => dangerConfirm({
    icon: <ExclamationIcon size={80} />,
    text: (
      <div className="flex flex-col items-center">
        <span>Apakah anda yakin menghapus activity</span>
        <div><span className=" font-bold">"{item.title}"</span> ?</div>
      </div>
    ),
    onCancel: () => {},
    onConfirm: async (onClose, onComplate) => {
      try {
        await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${item.id}`);
        setActivities((prev) => prev.filter( (prevItem) => prevItem.id !== item.id ));
        onComplate();
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          onComplate();
          onClose();
          if (error.status === 404) {
            setActivities((prev) => prev.filter( (prevItem) => prevItem.id !== item.id ));
            notification({icon: <ExclamationIcon size={24} />, text: "Data tidak ditemukan"})
          } else {
            notification({icon: <ExclamationIcon size={24} />, text: "Terjadi kesalahan, silahkan ulangi lagi"})
          }
        }
      }
    }
  });
  useEffect(() => {
    const controller = new AbortController();
    const syncActivity = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<any, AxiosResponse<ActivityResult>>("https://todo.api.devcode.gethired.id/activity-groups", { signal: controller.signal });
        setActivities(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    syncActivity();
    return () => controller.abort();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 data-cy="activity-title" className="text-[#111111] text-[28pt] font-bold">Activity</h1>
        <button className="bg-[#16ABF8] py-2 px-10 text-xl rounded-full text-white">+ Tambah</button>
      </div>
      <div className="grid grid-cols-4 mt-16 gap-4">
        {activities.map(
          (item) => (
            <div onClick={ ()=> navigate(`/detail/${item.id}`) } key={item.id} className="w-[235px] cursor-pointer flex flex-col justify-between shadow-lg rounded-xl px-5 py-4 h-[235px] bg-white">
              <h4 data-cy="activity-item-title" className=" font-bold text-xl">{item.title}</h4>
              <div className="flex flex-row items-center justify-between">
                <span data-cy="activity-item-date" className="text-[#888888] font-light text-sm">{moment(item.created_at).format("DD MMMM YYYY")}</span>
                <button onClick={deleteConfirm(item)}><TrashIcon size={24} /></button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
