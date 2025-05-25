import React, { useEffect, useState } from "react";

const Csr = () => {
  const [data, setDate] = useState(null);

  const getUser = async () => {
    const response = await fetch('https://randomuser.me/api/?nat=us&randomapi');
    const result = await response.json();
    setDate(result.results[0]);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      Hello, {data?.name?.title} {data?.name?.first} {data?.name?.last}
    </div>
  );
};

export default Csr;
