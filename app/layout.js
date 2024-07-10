import "./globals.css";

export const metadata = {
    title: "Souptik Maity",
    description:
        "Physics by training, Coding by exploration, Artistry by hobby, I transcend limitation.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>{children}</body>
        </html>
    );
}
