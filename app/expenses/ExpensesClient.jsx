'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus } from '../components/Icons';
import { Expense } from '../components/Form';
import { useSearchParams } from 'next/navigation';

export default function ExpensesClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [expens, setExpens] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const query = useSearchParams();

  useEffect(() => {
    setExpens(JSON.parse(localStorage.getItem(query.get('date')) || '[]'));
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is on a button with data-menu-button
      const isMenuButton = event.target.closest('[data-menu-button]');
      if (!isMenuButton) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = (idx) => {
    const updatedExpens = expens.filter((_, i) => i !== idx);
    setExpens(updatedExpens);
    localStorage.setItem(query.get('date'), JSON.stringify(updatedExpens));

    // Update remain in records
    const storedRecord = JSON.parse(localStorage.getItem('records') || '[]');
    const updatedRecords = storedRecord.map(r => {
      if (new Date(r.date).getTime() == query.get('date')) {
        r.remain = updatedExpens[0]?.remain || query.get('remain');
        return r;
      }
      return r;
    });
    localStorage.setItem('records', JSON.stringify(updatedRecords));
    setOpenMenuId(null);
  };

  const handleViewDetails = (item, idx) => {
    setSelectedItem({ ...item, idx });
    setShowDetails(true);
    setOpenMenuId(null);
  };

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
              <div key={idx} className="flex justify-between text-center items-center border-b py-3 mx-0.5 relative group">
                <p className={`${item.operation === '-' ? 'text-amber-400' : 'text-green-400'} w-[15%]`}>{item.operation}{Number(item.amount).toLocaleString('en-US')}</p>
                <p className="w-[59%] text-xs line-clamp-1">{item.reasion || item.name}</p>
                <p className={`${item.remain < 0 ? 'text-red-600' : 'text-green-400'} w-[15%]`}>{item.remain ?? '-'}</p>
                
                {/* Options Button */}
                <div className="relative w-[10%] flex justify-end" data-menu-button>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === idx ? null : idx)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Options menu"
                    data-menu-button
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === idx && (
                    <div className="absolute right-0 mt-8 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                      <button
                        onClick={() => handleViewDetails(item, idx)}
                        className="w-full text-left px-4 py-2 text-blue-400 hover:bg-gray-700 rounded-t-lg transition-colors duration-150 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        Show
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-700 rounded-b-lg transition-colors duration-150 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 bg-[#626287] z-20 rounded-full">
            <Plus className="w-16 text-slate-100" />
          </button>
        </div>
      </div>

      {/* Details Popup */}
        <div className={`fixed w-full h-full top-1/2 -translate-y-1/2 items-center z-50 flex bg-black ${showDetails ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} transition-all duration-500`}>
          <div className="grow p-6 bg-[#ffffff12] rounded-xl mx-2 max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Transaction Details</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-600 pb-3">
                <p className="text-sm font-semibold text-gray-400">Transaction Amount</p>
                <p className={`text-xl font-bold ${selectedItem.operation === '-' ? 'text-amber-400' : 'text-green-400'}`}>
                  {selectedItem.operation}{Number(selectedItem.amount).toLocaleString('en-US')}
                </p>
              </div>

              <div className="border-b border-gray-600 pb-3">
                <p className="text-sm font-semibold text-gray-400">Remaining Balance</p>
                <p className={`text-xl font-bold ${selectedItem.remain < 0 ? 'text-red-600' : 'text-green-400'}`}>
                  {selectedItem.remain ?? '-'}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">Message</p>
                <p className="text-sm text-gray-300">{selectedItem.reasion ? 'Transaction recorded successfully' : 'No additional message'}</p>
              </div>
            </div>

            <button onClick={() => setShowDetails(false)} className="w-full py-2 rounded-md bg-blue-600 mt-8 hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        </div>
    </>
  );
}
