import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@/public/fonts/font-face.css";
import HeaderBoard from "@/components/HeaderBoard";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { CartProvider } from "../context/CartContext";
import HeaderPage from "@/components/HeaderPage";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={cn(`max-h-screen  font-sans`)}>
      <CartProvider>
        {/* <HeaderPage user={loggedInUser} /> */}
        {children}
      </CartProvider>
      <Toaster />
    </section>
  );
}
