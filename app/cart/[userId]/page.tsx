"use client";

import Cart from "@/components/Cart";

export default function CartPage() {
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <Cart />
      </div>
    </main>
  );
}
