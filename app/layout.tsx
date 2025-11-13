export const metadata = {
  title: "Owner Is God Pay",
  description: "Tu plataforma moderna y segura de pagos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
