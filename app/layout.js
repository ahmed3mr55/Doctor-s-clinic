import "./globals.css";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";

export const metadata = {
  title: "Vera Clinics",
  description:
    "vera clinics is a leading medical center specializing in cosmetic and plastic surgery, offering a wide range of services to enhance your natural beauty. Our team of experienced surgeons and medical professionals are dedicated to providing personalized care and exceptional results. Whether you're looking for facial rejuvenation, body contouring, or non-surgical treatments, Vera Clinics is your trusted partner in achieving your aesthetic goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
