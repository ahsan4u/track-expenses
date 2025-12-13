import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./components/Context";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
        <div className={`h-[100dvh] overflow-hidden max-w-100 mx-auto flex flex-col justify-between`}>
          <Header className="h-[8.5%]"/>
          <div className="h-[83.5%] overflow-y-auto relative">
          {children}
          </div>
          <Footer className="h-[8%]" />
        </div>
        </AppProvider>
      </body>
    </html>
  );
}
