import React from 'react'
import ServicesPage from '../../features/services/ServicesPage'

export const metadata = {
  title: "خدمات د. عبدالرحمن عوف - نحت القوام، تجميل الوجه، نصائح طبية والمزيد",
  description: "اكتشف خدمات د. عبدالرحمن عوف المتخصصة في نحت القوام، تجميل الوجه، نصائح طبية والمزيد. احصل على استشارة مجانية اليوم وابدأ رحلتك نحو الجمال والصحة المثلى.",
};

const page = () => {
  return (
    <div id="services">
        <ServicesPage />
    </div>
  )
}

export default page
