import React from "react";

const Ssr = ({ data }) => {
  return (
    <div>
         Hello, {data?.name?.title} {data?.name?.first} {data?.name?.last}
    </div>
  );
};

export default Ssr;

export async function getServerSideProps() {
  const response = await fetch('https://randomuser.me/api/?nat=us&randomapi');
  const data = await response.json();

  return {
    props: {
      data: data.results[0],
    },
  };
}
