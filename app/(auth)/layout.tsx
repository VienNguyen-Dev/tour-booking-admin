import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const loggedInUser = await getLoggedInUser();
  // if (!loggedInUser) redirect("/admin/sign-in");
  return (
    <main className="h-screen mb-40">
      <section className={"max-h-screen flex"}>
        <div className="max-w-[900px] h-screen flex-1">
          <Image src={"/assets/image/sign-in-layout.png"} alt="image-layout" width={1000} height={1000} />
        </div>
        {children}
      </section>
    </main>
  );
}
