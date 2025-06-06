import React, {useEffect, useRef, useState} from "react";
import {client} from "@/utils/fethData";
import SpyCatData from "@/types/SpyCatData";
import CatSpy from "@/types/CatSpy";



interface AgentListProps {
    catSpyList: CatSpy[];
    setCatSpyList: React.Dispatch<React.SetStateAction<CatSpy[]>>;
}


export default function AgentList({ catSpyList, setCatSpyList  } : AgentListProps) {
    const [ediTableId, setEditableId] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [editSalary, setEditSalary] = useState<string | number | null>(null);


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [ediTableId]);




    function handleSave(objectId : number , editData : SpyCatData) {
        client.patch(`http://127.0.0.1:8000/system/spy-cat/${objectId}/`, editData).then(() => {
            setCatSpyList((prev) => prev.map((cat) => cat.id === objectId ? { ...cat, ...editData } : cat));
            setEditableId(null);
        })
            .catch((error) => {
                console.error("Error while save:", error);
            });
    }

    function handleDelete(objectId : number) {
        client.delete(`http://127.0.0.1:8000/system/spy-cat/${objectId}/`).then(() => {
            setCatSpyList((prevState) =>prevState.filter((cat) => cat.id !== objectId ) );
        })
            .catch((error) => {
                console.error("Error while save:", error);
            });
    }

    console.log()
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    ID
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Salary
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Years of experience
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Breed
                </th>

                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
            </thead>
            <tbody>
            {catSpyList.map((spyCat) => (
                <tr key={spyCat.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {spyCat.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                        {spyCat.name}
                    </td>

                    <td className="px-6 py-4 text-center">
                        {ediTableId === spyCat.id ? (
                            <input
                                ref={inputRef} className="border-1 border-black rounded-md p-1 shadow-sm"
                                value={editSalary ?? ''}
                                onChange={(e) => setEditSalary(e.target.value)}
                                onBlur={(e) => {
                                    handleSave(spyCat.id, {salary: +e.target.value});
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const target = e.target as HTMLInputElement;
                                        handleSave(spyCat.id, { salary: +target.value });
                                    }
                                }}
                            />
                        ) : (
                            <p>{spyCat.salary}</p>
                        )}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {spyCat.years_of_experience}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {spyCat.breed}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a
                            onClick={() => {
                                if (spyCat && spyCat.id !== undefined) {
                                    setEditableId(spyCat.id);
                                }
                                setEditSalary(spyCat.salary);
                            }}
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-10"
                        >
                            Edit
                        </a>
                        <a onClick={() => {
                            handleDelete(spyCat.id);
                        }} href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
                    </td>

                </tr>
            ))}
            </tbody>
        </table>
    )
}
