"use client";

import { useState } from "react";
import { InitialOnboardingValues } from "@/types/onboarding";

export function OnboardingForm() {
    const [form, setForm] = useState<InitialOnboardingValues>({
        name: "",
        villageId: "",
        isHead: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await fetch("/api/onboarding/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <label>Village</label>
                <input
                    value={form.villageId}
                    onChange={(e) => setForm({ ...form, villageId: e.target.value })}
                    placeholder="Village ID for now"
                    required
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={form.isHead}
                        onChange={(e) =>
                            setForm({ ...form, isHead: e.target.checked })
                        }
                    />
                    I am the head of the family
                </label>
            </div>

            {error && <p>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Continue"}
            </button>
        </form>
    );
}
