'use client';

import NavLayout from '../layouts/NavLayout';
import {React, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://futar.bkk.hu/api?key=ecfc61cb-78df-4ed8-88fb-a7bae5a6db02";
      const response = await fetch(url);
      let stream = response.body;
      for await (const chunk of stream) {
        console.log(chunk)
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <NavLayout>
        <h1 className='bg-gray-800 p-8'>Check console</h1>
      </NavLayout>
    </>
  );
}
