'use client';

import { useState } from "react";
import { useAppContext } from "./Context";
import { Plus } from "./Icons";

export function FormMoney({isOpen, setIsOpen}) {
    const [form, setForm] = useState({ amount: '', name: '' });
    const  {addRecord} = useAppContext();


    function setVal(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    function handleSubmit() {
        if (!form.amount || !form.name) return;
        addRecord({...form, date: String(new Date()), remain: form.amount});
        setIsOpen(false);
        setForm({ amount: '', name: '' });
    }

    return (
        <div className={`absolute w-full h-full items-center z-40 flex bg-black ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0' } transition-all duration-500`}>
            <button onClick={()=>setIsOpen(false)} className="absolute right-4 top-[10%] px-1.5 bg-red-500 rounded-md"><Plus className={'w-12 rotate-45'}/></button>
            <div className="grow p-4 bg-[#ffffff12] rounded-xl mx-2">
                <h1 className="text-center font-bold text-2xl">Add Record</h1>

                <label htmlFor="amt">
                    <span className="mb-2 block font-bold">Amount:</span>
                    <input value={form.amount} onChange={setVal} type="number" id="amt" name="amount" className="border rounded-md p-2 outline-none w-full" />
                </label>

                <label htmlFor="name" className="mt-4 block">
                    <span className="mb-2 block font-bold">Label:</span>
                    <input value={form.name} onChange={setVal} type="text" id="name" name="name" className="border rounded-md p-2 outline-none w-full" />
                </label>

                <button onClick={handleSubmit} className="w-full py-2 rounded-md bg-blue-600 mt-10">Submit</button>
            </div>
        </div>
    );
}


export function Expense({isOpen, setIsOpen, query, setExpens}) {
    const [form, setForm] = useState({ amount: '', reasion: '' });

    function setVal(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    function handleSubmit() {
        if (!form.amount || !form.reasion) return;
        const storedExpens = JSON.parse(localStorage.getItem(query.get('date')) || '[]');
        const remain = storedExpens[0]?.remain || query.get('remain');
        const newRemain = Number(remain)-Number(form.amount);


        const updatedExpens = {...form, createdAt: String(new Date()), remain: newRemain}
        setExpens(pre=>([updatedExpens, ...pre]));

        localStorage.setItem(query.get('date'), JSON.stringify([updatedExpens, ...storedExpens]));

        const storedRecord = JSON.parse(localStorage.getItem('records') || '[]');
        const updatedRecords = storedRecord.map(r => {
            if(r.date == query.get('date')) {
                console.log('new remain: ', remain,' ')
                r.remain = newRemain;
                return r;
            }
            return r;
        });
        
        localStorage.setItem('records', JSON.stringify(updatedRecords));
        setIsOpen(false);
        setForm({ amount: '', reasion: '' });
    }

    return (
        <div className={`absolute w-full h-full items-center z-40 flex bg-black ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0' } transition-all duration-500`}>
            <button onClick={()=>setIsOpen(false)} className="absolute right-4 top-[10%] px-1.5 bg-red-500 rounded-md"><Plus className={'w-12 rotate-45'}/></button>
            <div className="grow p-4 bg-[#ffffff12] rounded-xl mx-2">
                <label htmlFor="amt">
                    <span className="mb-2 block font-bold">Spend Amt:</span>
                    <input onChange={setVal} type="number" id="amt" value={form.amount} name="amount" className="border rounded-md p-2 outline-none w-full" />
                </label>

                <label htmlFor="reasion" className="mt-4 block">
                    <span className="mb-2 block font-bold">Label:</span>
                    <input onChange={setVal} type="text" id="reasion" value={form.reasion} name="reasion" className="border rounded-md p-2 outline-none w-full" />
                </label>

                <button onClick={handleSubmit} className="w-full py-2 rounded-md bg-blue-600 mt-10">Submit</button>
            </div>
        </div>
    );
}