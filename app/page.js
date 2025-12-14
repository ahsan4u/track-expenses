'use client';

import Link from "next/link";
import { Plus } from "./components/Icons";
import { useState } from "react";
import {FormMoney} from "./components/Form";
import { useAppContext } from "./components/Context";
import { formatDate } from "./utils/helper";
import { DropdownMenu } from "./components/DropdownMenu";

export default function Home() {
  const { data = [] } = useAppContext() || {};
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <FormMoney isOpen={isOpen} setIsOpen={setIsOpen} />
      {data.length < 1 ? <button onClick={() => setIsOpen(true)} className="absolute top-1/2 left-1/2 z-10 -translate-1/2 p-4 w-[40%] aspect-square rounded-full border-2 border-gray-700 bg-[#ffffff11] cursor-pointer">
        <Plus className='w-32' />
      </button> :
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Records</h1>
          <div className="grid grid-cols-2 gap-y-4 justify-items-center items-center">
            {data.map((record, index) => (
              <div key={record.date || index} className="relative w-[95%]">
                <Link href={`/expenses?date=${new Date(record.date).getTime()}&remain=${record.remain || record.amount}`} className="block relative px-3 py-2 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="absolute w-6 aspect-square rounded-full bg-red-600 left-0 top-0 -translate-1/2" />
                  <p className="font-light text-slate-600 text-sm">{record.name}</p>
                  <p className={`text-2xl mt-1 font-bold ${record.remain < 0 ?'text-red-600': 'text-amber-400'}`}>{Number(record.remain).toLocaleString('en-US')}₹</p>
                  <div className="flex justify-between">
                    <p className="text-xs mt-2">{formatDate(record.date)}</p>
                    <p className={`text-green-400 text-xs mt-2`}>{Number(record.amount).toLocaleString('en-US')}</p>
                  </div>
                </Link>
                <div className="absolute top-1 right-0">
                  <DropdownMenu date={record.date}/>
                </div>
              </div>
            ))}

            <button onClick={() => setIsOpen(true)} className="p-2 w-[50%] cursor-pointer aspect-square rounded-full border-2 border-gray-700 bg-[#ffffff11] ">
              <Plus className='w-18' />
            </button>
          </div>
        </div>
      }
    </div>
  );
}
