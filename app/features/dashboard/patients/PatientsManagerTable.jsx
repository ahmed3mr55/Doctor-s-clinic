"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";

const BlogManagerTable = ({ patients = [], onDelete, canUpdate = false, canDelete = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm) ||
      patient.patientCode
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const localHandleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden font-cairo">
      {/* Search */}
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <div className="max-w-md relative">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
            size={18}
          />

          <input
            type="text"
            placeholder="ابحث باسم المريض أو الهاتف أو كود المريض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/30">
              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider">
                كود المريض
              </th>

              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider">
                بيانات المريض
              </th>

              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider">
                النوع
              </th>

              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider">
                المدينة
              </th>

              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider">
                تاريخ الإضافة
              </th>

              <th className="p-4 lg:p-5 text-xs font-black text-stone-400 uppercase tracking-wider text-center">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-stone-50/60 transition-colors group"
                >
                  {/* Patient Code */}
                  <td className="p-4 lg:p-5">
                    <span className="text-xs font-bold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {patient.patientCode}
                    </span>
                  </td>

                  {/* Patient Info */}
                  <td className="p-4 lg:p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-orange-50 flex items-center justify-center text-stone-500 group-hover:text-orange-600 transition-colors">
                        <User size={18} />
                      </div>

                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">
                          {patient.fullName}
                        </h4>

                        <p
                          className="text-xs font-medium text-stone-400 mt-0.5"
                          dir="ltr"
                        >
                          {patient.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Gender */}
                  <td className="p-4 lg:p-5">
                    <span className="text-sm font-medium text-stone-700">
                      {patient.gender === "MALE" ? "ذكر" : "أنثى"}
                    </span>
                  </td>

                  {/* City */}
                  <td className="p-4 lg:p-5">
                    <span className="text-sm font-medium text-stone-700">
                      {patient.city || "-"}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="p-4 lg:p-5">
                    <span className="text-sm font-medium text-stone-500">
                      {new Date(patient.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 lg:p-5">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/patients/${patient.id}`}
                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                        title="عرض الملف الطبي"
                      >
                        <Eye size={18} />
                      </Link>
                      {canUpdate && (
                      <Link
                        href={`/dashboard/patients/${patient.id}/edit`}
                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                        title="تعديل الملف الطبي"
                      >
                        <Edit size={18} />
                      </Link>
                      )}

                      {canDelete && (
                      <button
                        onClick={() => localHandleDelete(patient.id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="حذف المريض"
                      >
                        <Trash2 size={18} />
                      </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-12 text-center">
                  <p className="text-stone-400 font-bold text-sm">
                    لا يوجد مرضى.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-stone-100 bg-stone-50/30 flex items-center justify-between text-xs font-bold text-stone-500">
        <span>
          عرض {filteredPatients.length} من أصل {patients.length} مريض
        </span>

        <div className="flex items-center gap-2">
          <button className="p-1.5 border border-stone-200 rounded-lg bg-white text-stone-400 cursor-not-allowed">
            <ChevronRight size={16} />
          </button>

          <button className="p-1.5 border border-stone-200 rounded-lg bg-white text-stone-400 cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManagerTable;
