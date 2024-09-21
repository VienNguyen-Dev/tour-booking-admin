import HeaderBoard from "@/components/HeaderBoard";
import LeftSidebar from "@/components/LeftSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) redirect("/sign-in");
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <LeftSidebar />
      <section className={"min-h-screen w-full flex flex-col px-4 md:px-[22px]"}>
        <HeaderBoard user={loggedInUser} />
        {children}
      </section>
    </main>
  );
}
