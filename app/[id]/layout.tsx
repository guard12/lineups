export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-8">{children}</div>;
}
