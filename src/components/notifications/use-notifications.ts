import { useMarkAllNotificationAsRead } from "@/hooks/mutation";
import { FilterData } from "../user-profile/types";

const useNotifications = () => {
  const markAsRead = useMarkAllNotificationAsRead();

  const handleMarkAsRead = () => {
    markAsRead();
  };

  const filterData: FilterData[] = [
    {
      id: "1",
      displayName: "todos",
      filterName: undefined
    },
    {
      id: "2",
      displayName: "no leidos",
      filterName: "unread"
    }
  ];
  return {
    handleMarkAsRead,
    filterData
  };
};

export default useNotifications;
