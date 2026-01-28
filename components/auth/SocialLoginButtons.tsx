"use client";

import { authClient } from "@/lib/auth-client";
import { AUTH_PROVIDERS } from "@/lib/constants";

export function SocialLoginButtons() {
    return (
        <div className="space-y-3">
            {AUTH_PROVIDERS.filter(p => p.enabled).map(p => (
                <button
                    key={p.id}
                    onClick={() =>
                        authClient.signIn.social({
                            provider: p.id,
                            callbackURL: "/dashboard",
                            newUserCallbackURL: "/onboarding",
                        })
                    }
                >
                    Continue with {p.name}
                </button>
            ))}
        </div>
    );
}
