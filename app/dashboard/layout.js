// app/dashboard/layout.js
import Sidebar from "@/app/Components/layout/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ForbiddenComponent from "../features/forbidden/ForbiddenComponent";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const { user } = await getCurrentUser();

  if (!user) {
    return <ForbiddenComponent />;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-white">
        <Sidebar user={user} />
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
