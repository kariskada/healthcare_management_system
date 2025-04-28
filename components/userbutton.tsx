import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Toaster } from "sonner";
// ... your other imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <header className="p-4 flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </header>
          {children}
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}