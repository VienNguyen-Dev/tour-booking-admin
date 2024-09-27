import Image from "next/image";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <section className={" flex justify-center sm:justify-start"}>
        <div className="xl:max-w-[900px] lg:min-h-screen min-h-full hidden sm:block w-full flex-1">
          <Image width={1000} height={1000} src={"/assets/image/background-auth.png"} alt="image-layout" className="max-w-[900px] h-full w-full" />
        </div>
        {children}
      </section>
    </main>
  );
}
