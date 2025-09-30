
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">

        <nav className="bg-white shadow-md px-6 py-4 flex space-x-6">
          {/* Usuários */}
          <div className="flex space-x-2">
            <a href="/users" className="text-gray-700 font-semibold hover:text-blue-600">
              Tabela de Usuários
            </a>
            <a href="/users/create" className="text-gray-700 font-semibold hover:text-blue-600">
              Criar Usuário
            </a>
          </div>

          {/* Carros */}
          <div className="flex space-x-2">
            <a href="/cars" className="text-gray-700 font-semibold hover:text-blue-600">
              Tabela de Carros
            </a>
            <a href="/cars/create" className="text-gray-700 font-semibold hover:text-blue-600">
              Criar Carro
            </a>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
