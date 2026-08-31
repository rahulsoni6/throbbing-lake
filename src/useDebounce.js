import { useState, useEffect } from "react";

const useDebounce = (searchValue, delay) => {
  const [loading, setLoading] = useState(false);
  const [searchedValue, setSearchedValue] = useState(searchValue);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setSearchedValue(searchValue);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchValue, delay]);

  return { searchedValue, loading };
};

export default useDebounce;
