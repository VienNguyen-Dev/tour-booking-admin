import { useEffect, useState } from "react";

const [data, setData] = useState([]);
const [isLoading, setisLoading] = useState(false);
export const useAppwrite = (fn: () => void) => {
  const fetchData = async () => {
    try {
      setisLoading(true);
      const response: any = await fn();
      if (response) {
        setData(response);
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return {
    data,
    refetch,
  };
};
