import Image from "next/image";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen mb-40">
      <section className={"max-h-screen flex justify-center sm:justify-start"}>
        <div className="max-w-[900px] xl:h-full  h-screen hidden sm:block w-full flex-1">
          <Image width={1000} height={1000} src={"/assets/image/background-auth.png"} alt="image-layout" className="max-w-[900px] h-full w-full" />
        </div>
        {children}
      </section>
    </main>
  );
}
