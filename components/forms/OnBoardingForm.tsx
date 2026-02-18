"use client";

import { useEffect, useState } from "react";
import { InitialOnboardingValues } from "@/types/onboarding";
import { Village } from "@/types/village";
const STEPS = ["name", "village", "head"] as const;
type Step = (typeof STEPS)[number];

// TEMP — replace with API later
const TEMP_VILLAGES = [
    { id: "ankleshvar", name: "Ankleshvar" },
    { id: "rajkot", name: "Rajkot" },
    { id: "surendranagar", name: "Surendranagar" },
];

export function OnboardingForm() {
    const [step, setStep] = useState<Step>("name");

    const [form, setForm] = useState<InitialOnboardingValues>({
        name: "",
        villageId: "",
        isHead: false,
    });

    const [villages, setVillages] = useState<Village[]>([]);
    const [villagesLoading, setVillagesLoading] = useState(true);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadVillages() {
            try {
                const res = await fetch("/api/villages");
                const data = await res.json();

                if (data.success) {
                    setVillages(data.data);
                } else {
                    setError("Failed to load villages");
                }
            } catch {
                setError("Failed to load villages");
            } finally {
                setVillagesLoading(false);
            }
        }

        loadVillages();
    }, []);


    function next() {
        const idx = STEPS.indexOf(step);
        setStep(STEPS[idx + 1]);
    }

    function back() {
        const idx = STEPS.indexOf(step);
        setStep(STEPS[idx - 1]);
    }

    async function handleSubmit() {
        setError(null);
        setLoading(true);

        const res = await fetch("/api/onboarding/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok || !data.success) {
            setError(data?.error?.message ?? "Something went wrong");
            return;
        }

        window.location.href = "/dashboard";
    }

    return (
        <div className="max-w-md mx-auto p-4 space-y-6">
            {/* STEP INDICATOR */}
            <div className="flex justify-between text-sm text-gray-500">
                {STEPS.map((s) => (
                    <span
                        key={s}
                        className={s === step ? "font-semibold text-black" : ""}
                    >
                        {s.toUpperCase()}
                    </span>
                ))}
            </div>

            {/* STEP CONTENT */}
            {step === "name" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Your name</h2>

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <button
                        className="w-full bg-black text-white p-2 rounded"
                        disabled={form.name.trim().length < 2}
                        onClick={next}
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === "village" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Select your village</h2>

                    <select
                        className="w-full border p-2 rounded"
                        value={form.villageId}
                        onChange={(e) =>
                            setForm({ ...form, villageId: e.target.value })
                        }
                        disabled={villagesLoading}
                    >
                        <option value="">
                            {villagesLoading ? "Loading villages..." : "Select village"}
                        </option>

                        {villages.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>


                    <div className="flex gap-2">
                        <button className="flex-1 border p-2 rounded" onClick={back}>
                            Back
                        </button>
                        <button
                            className="flex-1 bg-black text-white p-2 rounded"
                            disabled={!form.villageId}
                            onClick={next}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {step === "head" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Family role</h2>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.isHead}
                            onChange={(e) =>
                                setForm({ ...form, isHead: e.target.checked })
                            }
                        />
                        I am the head of the family
                    </label>

                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex gap-2">
                        <button className="flex-1 border p-2 rounded" onClick={back}>
                            Back
                        </button>
                        <button
                            className="flex-1 bg-black text-white p-2 rounded"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Submitting..." : "Finish"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
