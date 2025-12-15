'use client';

import { useEffect, useState } from 'react';
import { Plus } from '../components/Icons';
import { Expense } from '../components/Form';
import { useSearchParams } from 'next/navigation';

export default function ExpensesClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [expens, setExpens] = useState([]);
  const query = useSearchParams();

  useEffect(() => {
    setExpens(JSON.parse(localStorage.getItem(query.get('date')) || '[]'));
  }, [query]);

  return (
    <>
      <Expense isOpen={isOpen} setIsOpen={setIsOpen} query={query} setExpens={setExpens} />
      <div>
        <div className="p-4">
          <div className="flex justify-between text-center bg-[#ffffff11] p-2 rounded-md font-bold">
            <p className={`w-[20%]`}>Transaction</p>
            <p className=" w-[55%] ">Label</p>
            <p className={`w-[20%]`}>Remains</p>
          </div>

          <div className='pt-1'>
            {expens.map((item, idx) => (
              <div key={idx} className="flex justify-between text-center items-center border-b py-3 mx-0.5">
                <p className={`${item.operation === '-' ? 'text-amber-400' : 'text-green-400'} w-[20%]`}>{item.operation}{Number(item.amount).toLocaleString('en-US')}</p>
                <p className="w-[59%] text-xs line-clamp-1">{item.reasion || item.name}</p>
                <p className={`${item.remain < 0 ? 'text-red-600' : 'text-green-400'} w-[20%]`}>{item.remain ?? '-'}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setIsOpen(true)} className="absolute bottom-8 right-8 bg-[#626287] z-20 rounded-full">
            <Plus className="w-16 text-slate-100" />
          </button>
        </div>
      </div>
    </>
  );
}
