"use client";

import {useEffect, useState} from "react";
import {client} from "@/utils/fethData";
import AgentList from "@/app/components/agentList";
import RegisterForm from "@/app/components/registerForm";
import FormData from "@/types/FormData";
import CatSpy from "@/types/types";
import Breed from "@/types/Breed";

export default function Home() {

  const [catSpyList, setCatSpyList] = useState<CatSpy[]>([]);
  const [catSpyBreed , setCatSpyBreed] = useState<Breed[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    years_of_experience: 0,
    salary: 0,
    breed: '',
  });


  useEffect(() => {
    client
        .get<CatSpy[]>('http://127.0.0.1:8000/system/spy-cat/')
        .then((response) => {
          if (response && response) {
            setCatSpyList(response);
          } else {
            console.warn("empty answer");
            setCatSpyList([]);
          }
        })
        .catch((error) => {
          console.error("Error while loading data", error);
        });
  }, []);

  useEffect(() => {
    client
        .get<Breed[]>('http://127.0.0.1:8000/system/breed/')
        .then((response) => {
          if (response && response) {
            setCatSpyBreed(response);
          } else {
            console.warn("Empty answer or no data on breeds:");
            setCatSpyBreed([]);
          }
        })
        .catch((error) => {
          console.error("Error loading breeds:", error);
        });
  }, []);


  return (
      <div className={'relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1200px] m-auto'}>
        <div className={'flex flex-col gap-7'}>
          <h1 className={'text-purple-900 text-lg text-center border-4'}>List spy cats</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-5">
            <AgentList catSpyList={catSpyList} setCatSpyList={setCatSpyList} catSpyBreed={catSpyBreed} />
            <RegisterForm  setFormData={setFormData} formData={formData}  setCatSpyList={setCatSpyList} catSpyBreed={catSpyBreed}  />
          </div>

        </div>
      </div>
  );
}
