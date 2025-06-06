import Select, {SingleValue} from "react-select";
import React, {JSX, useState} from "react";
import {client} from "@/utils/fethData";
import CatSpy from "@/types/types";
import FormData from "@/types/FormData";
import Breed from "@/types/Breed";
import SpyCatData from "@/types/SpyCatData";

interface RegisterFormProps {
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setCatSpyList: React.Dispatch<React.SetStateAction<CatSpy[]>>;
    formData: FormData;
    catSpyBreed: Breed[];
}

export default function RegisterForm(
    {
                                         setFormData,
                                         setCatSpyList,
                                         formData,
                                        catSpyBreed,
                                     }: RegisterFormProps): JSX.Element {

    type OptionType = {
        value: string | number;
        label: string;
    };

    const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);



    function handlePost(newData : SpyCatData) {
        client.post(`http://127.0.0.1:8000/system/spy-cat/` , newData).then((response) => {
            // @ts-expect-error: system misunderstand the response
            setCatSpyList( ((prevState) =>[...prevState , response.data]));
            setFormData({
                name: '',
                years_of_experience: 0,
                salary: 0,
                breed: '',
            });
            setSelectedOption(null);
        })
            .catch((error) => {
                console.error("Error while save:", error);
            });
    }

    const optionsSelect = [
        { value: 'none', label: 'Choose agent breed' },
        ...catSpyBreed.map((breed) => ({
            value:  breed.id,
            label: `${breed.name}`,
        })),
    ];


    return (

        <>
            <h3 className={'text-purple-900 text-lg text-center border-4'}>Add new Agent</h3>
            <form className="min-w-[500px] flex flex-col m-auto pb-6" onSubmit={(event) => {
                event.preventDefault()
            }
            }>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Agent
                        Name</label>
                    <input onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} type="form" id="name"
                           className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                           placeholder="write  agent name"
                           value={formData.name}
                           required/>

                </div>
                <div className="mb-5">
                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">years of
                        experience</label>
                    <input
                        onChange={(e) => setFormData(prev => ({...prev, years_of_experience: +e.target.value}))}
                        type="form"
                        id="years"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        placeholder="write agent years of experience"
                        required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="salary"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">salary</label>
                    <input onChange={(e) => setFormData(prev => ({...prev, salary: +e.target.value}))} type="salary"
                           id="salary"
                           className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                           placeholder="write agent salary"
                           required/>
                </div>
                <div className="mb-5">

                    <Select
                        value={selectedOption}
                        onChange={(option) => {
                            setSelectedOption(option);
                            if (option) {
                                setFormData(prev => ({ ...prev, breed: option.value}));
                            }
                        }}
                        options={optionsSelect}
                        placeholder="choose breed agent"
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                padding: '3px',
                                background: '#374151',
                                color: '#white',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#F1F2F9',
                            }),
                            indicatorSeparator: () => ({
                                display: 'none',
                            }),
                            menu: () => ({
                                background: '#374151',
                                color: '#F1F2F9',
                            }),
                        }}
                    />
                </div>


                <button onClick={() => {
                    handlePost(formData)
                }} type="submit"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Register
                    New Agent
                </button>
            </form>
        </>
)
}
