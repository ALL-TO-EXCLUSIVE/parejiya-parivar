import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/getMyProfile";
import { getAuthUser } from "@/lib/getAuthUser";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getAuthUser();
    if (!user) redirect("/login");

    const profile = await getMyProfile();
    if (!profile || !profile.profileCompleted) {
        redirect("/onboarding");
    }

    return <>{children}</>;
}
