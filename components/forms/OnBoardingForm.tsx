"use client";

import { useState } from "react";

export function OnboardingForm() {
    const [isHead, setIsHead] = useState(false);
    const [name, setName] = useState("");
    const [villageId, setVillageId] = useState("");

    async function submit() {
        await fetch("/api/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                villageId,
                isHead,
            }),
        });

        window.location.href = "/dashboard";
    }

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <select onChange={e => setVillageId(e.target.value)} />
            <label>
                <input
                    type="checkbox"
                    checked={isHead}
                    onChange={e => setIsHead(e.target.checked)}
                />
                Are you head?
            </label>

            <button onClick={submit}>Continue</button>
        </div>
    );
}
