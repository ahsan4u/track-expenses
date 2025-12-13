'use client';

import { useEffect, useState } from 'react';
import { Plus } from '../components/Icons';
import { Expense } from '../components/Form';
import { useSearchParams } from 'next/navigation';

export default function ExpensesClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [expens, setExpens] = useState([]);
  const searchParams = useSearchParams();
  const dateParam = searchParams ? searchParams.get('date') : null;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('expens') || '[]');

    if (dateParam) {
      setExpens(data.filter((d) => String(d.date) === String(dateParam)));
    } else {
      setExpens(data);
    }
  }, [dateParam]);

  return (
    <>
      <Expense isOpen={isOpen} setIsOpen={setIsOpen} query={searchParams} setExpens={setExpens} />
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between text-center bg-[#ffffff11] p-2 rounded-md font-bold">
            <p className={`text-green-400 w-[20%]`}>Expend</p>
            <p className="text-amber-400 w-[55%] ">Message</p>
            <p className={`text-green-400 w-[20%]`}>Rest amt</p>
          </div>

          {expens.map((item, idx) => (
            <div key={idx} className="flex justify-between text-center items-center border-y py-1.5 mx-0.5">
              <p className={`text-green-400 w-[20%]`}>{Number(item.amount).toLocaleString('en-US')}</p>
              <p className="text-amber-400 w-[55%] text-xs">{item.reasion || item.name}</p>
              <p className={`text-green-400 w-[20%]`}>{item.remain ?? '-'}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setIsOpen(true)} className="absolute bottom-6 right-6 bg-[#2c2c4b] z-20 rounded-full">
          <Plus className="w-14 text-slate-100" />
        </button>
      </div>
    </>
  );
}
