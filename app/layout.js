import "./globals.css";
import Header from "./components/Header";
import { AppProvider } from "./components/Context";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
        <div className={`h-[100dvh] overflow-hidden max-w-100 mx-auto flex flex-col justify-between`}>
          <Header className="h-[8.5%]"/>
          <div className="h-[91.5%] overflow-y-auto relative">
          {children}
          </div>
        </div>
        </AppProvider>
      </body>
    </html>
  );
}
