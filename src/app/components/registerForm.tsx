import React, {JSX, useState} from "react";
import {client} from "@/utils/fethData";
import CatSpy from "@/types/CatSpy";
import FormData from "@/types/FormData";

interface RegisterFormProps {
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setCatSpyList: React.Dispatch<React.SetStateAction<CatSpy[]>>;
    formData: FormData;
    resetError: (setError : React.Dispatch<React.SetStateAction<string | null>>) => void;

}

export default function RegisterForm(
    {
                                         setFormData,
                                         setCatSpyList,
                                         formData,
                                        resetError
                                     }: RegisterFormProps): JSX.Element {


    const [registerError, setRegisterError] = useState<string | null>(null)


    function handlePost(data : CatSpy) {


        const preparedData: CatSpy= {
            id : data.id,
            name: data.name,
            breed: data.breed,
            years_of_experience: Number(data.years_of_experience),
            salary: Number(data.salary),
        };
        client.post(`http://127.0.0.1:8000/system/spy-cat/` , preparedData).then((response) => {
            // @ts-expect-error: system misunderstand the response
            setCatSpyList( ((prevState) =>[...prevState , response]));
            setFormData({
                name: '',
                years_of_experience: '',
                salary: '',
                breed: '',
            });
        })
            .catch((error) => {
                setRegisterError(`Error while save, Details: ${error}`)
                resetError(setRegisterError)
            });
    }


    return (

        <>
            <h3 className={'text-purple-900 text-lg text-center border-4'}>Add new Agent</h3>
            {registerError && (
                <div className='bg-red-700 text-white p-10 text-center'>{registerError}</div>
            )}
            <form className="min-w-[500px] flex flex-col m-auto pb-6" onSubmit={(event) => {
                event.preventDefault()
                handlePost(formData)
            }
            }>


                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Agent
                        Name</label>
                    <input onChange={(e) =>{
                        setFormData(prev => ({...prev, name: e.target.value}))
                    }} type="form"
                           id="name"
                           className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                           placeholder="write  agent name"
                           value={formData.name}
                           required/>

                </div>
                <div className="mb-5">
                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">years
                        of
                        experience</label>
                    <input
                        onChange={(e) => setFormData(prev => ({...prev, years_of_experience: e.target.value}))}
                        type="form"
                        id="years"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        placeholder="write agent years of experience"
                        required
                        value={formData.years_of_experience}
                    />

                </div>
                <div className="mb-5">
                    <label htmlFor="salary"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">salary</label>
                    <input onChange={(e) => setFormData(prev => ({...prev, salary: e.target.value}))} type="salary"
                           id="salary"
                           className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                           placeholder="write agent salary"
                           required
                           value={formData.salary}
                    />

                </div>
                <div className="mb-5">
                    <label htmlFor="breed"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">breed</label>
                    <input onChange={(e) => setFormData(prev => ({...prev, breed: e.target.value}))}
                           id="breed"
                           className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                           placeholder="write agent breed"
                           required
                           value={formData.breed}
                    />

                </div>


                <button type="submit"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Register
                    New Agent
                </button>
            </form>
        </>
    )
}
