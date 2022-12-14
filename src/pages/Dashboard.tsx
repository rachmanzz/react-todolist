import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DivWrapper from "../components/DivWrapper";
import dangerConfirm from "../components/helper/dangerConfirm";
import notification from "../components/helper/notification";
import ExclamationIcon from "../components/icons/ExclamationIcon";
import InfoIcon from "../components/icons/InfoIcon";
import LoadingIcon from "../components/icons/LoadingIcon";
import TrashIcon from "../components/icons/TrashIcon";
import EmptyActivity from "../components/svg/EmptyActivity";

moment.updateLocale('id', {
  months: [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
    "Agustus", "September", "Oktober", "November", "Desember"
  ]
});


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

const errorNotification = (text: string) => notification({ icon: <ExclamationIcon size={24} />, text });
function Dashboard() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const navigate = useNavigate();
  const [onCreateLoading, setOnCreateLoading] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  const deleteConfirm = (item: ActivityType) => () => dangerConfirm({
    icon: <ExclamationIcon size={80} />,
    text: (
      <div className="flex flex-col items-center">
        <span>Apakah anda yakin menghapus activity</span>
        <div><span className=" font-bold">"{item.title}"</span> ?</div>
      </div>
    ),
    onCancel: (onclose) => onclose(),
    onConfirm: async (onClose, onComplate) => {
      try {
        await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${item.id}`);
        setActivities((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
        onComplate();
        onClose();
        notification({ icon: <InfoIcon size={24} />, text: "Activity berhasil dihapus" })
      } catch (error) {
        if (axios.isAxiosError(error)) {
          onComplate();
          onClose();
          if (error.status === 404) {
            setActivities((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
            notification({ icon: <ExclamationIcon size={24} />, text: "Data tidak ditemukan" })
          } else {
            notification({ icon: <ExclamationIcon size={24} />, text: "Terjadi kesalahan, silahkan ulangi lagi" })
          }
        }
      }
    }
  });
  const onSyncActivity = async () => {
    try {
      const { data } = await axios.get<any, AxiosResponse<ActivityResult>>("https://todo.api.devcode.gethired.id/activity-groups?email=rachman@example.com");
      setActivities(data.data);
    } catch (error) {
    }
    setOnCreateLoading(false);
  }

  const onCreateActivity = async () => {
    try {
      setOnCreateLoading(true);
      await axios.post(`https://todo.api.devcode.gethired.id/activity-groups`, { title: "New Activity", email: "rachman@example.com" });
      onSyncActivity();
    } catch (error) {
      setOnCreateLoading(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    const syncActivity = async () => {
      try {
        const { data } = await axios.get<any, AxiosResponse<ActivityResult>>("https://todo.api.devcode.gethired.id/activity-groups?email=rachman@example.com", { signal: controller.signal });
        setActivities(data.data);
        setContentLoaded(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.name === "CanceledError") return; // ubsubcribe
        }
        errorNotification("Gagal memuat activity");
      }

    }
    syncActivity();
    return () => controller.abort();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 data-cy="activity-title" className="text-[#111111] text-[24pt] md:text-[28pt] font-bold">Activity</h1>
        <button onClick={onCreateActivity} className="bg-[#16ABF8] py-2 px-5 md:px-10 text-xl rounded-full text-white">{onCreateLoading ? <LoadingIcon color="white" size={24} /> : "+ Tambah"}</button>
      </div>
      <div className="grid grid-cols-2 pb-10 md:grid-cols-4 mt-16 gap-4">
        {activities.map(
          (item) => {
            return (
              <div key={item.id} data-cy="activity-item" className="lg:w-[235px] h-[200px] lg:h-[235px] flex flex-col justify-between shadow-lg rounded-xl py-4  bg-white">
                <div onClick={() => navigate(`/detail/${item.id}`)} className="flex cursor-pointer h-full px-5">
                  <h4 data-cy="activity-item-title" className=" font-bold text-xl">{item.title}</h4>
                </div>
                <div className="flex px-5 flex-row items-center justify-between">
                  <span data-cy="activity-item-date" className="text-[#888888] font-light text-sm">{moment(item.created_at).format("DD MMMM YYYY")}</span>
                  <button data-cy="activity-item-delete-button" onClick={deleteConfirm(item)}><TrashIcon size={24} /></button>
                </div>
              </div>
            )
          }
        )}


      </div>
      {!contentLoaded && (
        <div className="flex flex-row justify-center pt-20"><LoadingIcon color="#16ABF8" size={40} /></div>
      )}
      {contentLoaded && activities.length === 0 && (<DivWrapper paddings={[1, 5, 1, 5]} className="flex cursor-pointer my-10">
        {([width]) => (
          <div onClick={onCreateActivity}>
            <EmptyActivity width={width >= 768 ? width - 100 : width} />
          </div>
        )}
      </DivWrapper>)}
    </div>
  );
}

export default Dashboard;
