import React from "react";
import EditPatientFormClient from "@/app/features/dashboard/patients/edit/EditPatientFormClient";
import { cookies } from "next/headers";

// دالة جلب بيانات المريض على السيرفر (SSR)
async function getPatientData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${baseUrl}/api/patients/${id}`, {
      cache: "no-store", // لضمان جلب البيانات الحية دائماً عند كل زيارة
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { patient: null, error: errorData.error || "تعذر جلب بيانات المريض" };
    }

    const data = await response.json();
    // دعم لشكلين الرد المتوقعين من الـ GET (سواء كان الكائن مباشرة أو داخل خاصية patient)
    const patient = data.patient || data;
    return { patient, error: null };
  } catch (error) {
    console.error("Error fetching patient data on Server:", error);
    return { patient: null, error: "حدث خطأ في الاتصال بالخادم الداخلي" };
  }
}

export const dynamic = "force-dynamic";

export default async function EditPatientPage({ params }) {
  // فك الـ Promise الخاص بـ params للتوافق الكامل مع Next.js 15
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // جلب البيانات مباشرة أثناء عملية الرندر على السيرفر
  const { patient, error } = await getPatientData(id);

  return (
    <EditPatientFormClient 
      initialPatient={patient} 
      serverError={error} 
      patientId={id} 
    />
  );
}