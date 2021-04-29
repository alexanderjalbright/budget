import { React, useState } from 'react';

export default function Submit({ data }) {
    const [responseSubmit, setResponseSubmit] = useState();
    const [responseSubmitError, setResponseSubmitError] = useState();
    async function handleSubmit() {
        const res = await fetch(`/api/submit`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'title',
                body: data,
            }),
        });
        const json = await res.json();
        if (!json) {
            setResponseSubmitError(null);
        }
        setResponseSubmit(json);
    }

    return (
        <div className="mt-4 p-4 text-center bg-red-200 rounded max-w-md">
            <button
                className="mt-2 p-2 rounded bg-blue-500"
                onClick={() => handleSubmit()}
            >
                Submit
            </button>
            {responseSubmit && <div>{responseSubmit.responseSubmit} </div>}
        </div>
    );
}
