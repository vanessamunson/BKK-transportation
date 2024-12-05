'use client';

import NavLayout from './layouts/NavLayout';
import protobuf from 'protobufjs';
import {React, useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://go.bkk.hu/api/query/v1/ws/gtfs-rt/full/VehiclePositions.pb?key=ecfc61cb-78df-4ed8-88fb-a7bae5a6db02";
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const root = await protobuf.load("gtfs-realtime.proto");
      const FeedMessage = root.lookupType("transit_realtime.FeedMessage");
      const decoded = FeedMessage.decode(new Uint8Array(buffer));
      let data = decoded.entity;
      setData(data);
      let jsonData = data.map(item => item.toJSON());
      console.log(JSON.stringify(jsonData, null, 2));
    };
    fetchData();
  }, []);


  return (
    <>
      <NavLayout>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
          <th scope='col' className='px-6 py-3'>Label</th>
          <th scope='col' className='px-6 py-3'>License Plate</th>
          <th scope='col' className='px-6 py-3'>Latitute</th>
          <th scope='col' className='px-6 py-3'>Longitude</th>
          <th scope='col' className='px-6 py-3'>Status</th>
          <th scope='col' className='px-6 py-3'>Timestamp</th>
        </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              <td className='px-6 py-4'>{item.vehicle?.vehicle?.label || 'N/A'}</td>
              <td className='px-6 py-4'>{item.vehicle?.vehicle?.licensePlate || 'N/A'}</td>
              <td className='px-6 py-4'>{item.vehicle?.position?.latitude || 'N/A'}</td>
              <td className='px-6 py-4'>{item.vehicle?.position?.longitude || 'N/A'}</td>
              <td className='px-6 py-4'>{item.vehicle?.currentStatus == 1 ? 'Stopped' : 'In Transit'}</td>
              <td className='px-6 py-4'>{item.vehicle?.timestamp || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </NavLayout>
    </>
  );
}
