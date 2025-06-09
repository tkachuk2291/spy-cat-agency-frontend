"use client";

import React, {useEffect, useRef, useState} from "react";
import {client} from "@/utils/fethData";
import AgentList from "@/app/components/agentList";
import RegisterForm from "@/app/components/registerForm";
import FormData from "@/types/FormData";
import CatSpy from "@/types/CatSpy";

export default function Home() {

  const [catSpyList, setCatSpyList] = useState<CatSpy[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    years_of_experience: '',
    salary: '',
    breed: '',
  });
    const [error, setError] = useState<string | null>(null);
    const errorTimerRef = useRef<number | null>(null);


    const resetError = (resetSetError : React.Dispatch<React.SetStateAction<string | null>>) => {
        errorTimerRef.current = window.setTimeout(() => {
            resetSetError(null)
            errorTimerRef.current = null;
        }, 3000);
    };


    useEffect(() => {
    client
        .get<CatSpy[]>('http://127.0.0.1:8000/system/spy-cat/')
        .then((response) => {
          if (response && response) {
            setCatSpyList(response);
          } else {
              setError(`empty answer`)
              resetError(setError)
            setCatSpyList([]);
          }
        })
        .catch((error) => {
            setError(`Error while loading data, ${error}`)
            resetError(setError)
        });
  }, []);



  return (
      <div className={'relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1200px] m-auto'}>
        <div className={'flex flex-col gap-7'}>
          <h1 className={'text-purple-900 text-lg text-center border-4'}>List spy cats</h1>
            {error && (
                <div className='bg-red-700 text-white p-10 text-center'>{error}</div>
            )}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-5">
            <AgentList catSpyList={catSpyList} setCatSpyList={setCatSpyList}  error={error}  resetError={resetError}   />
            <RegisterForm  setFormData={setFormData} formData={formData}  setCatSpyList={setCatSpyList} resetError={resetError} />
          </div>

        </div>
      </div>
  );
}
