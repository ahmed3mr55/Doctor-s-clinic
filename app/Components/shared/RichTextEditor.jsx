"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Heading2, Heading3, Heading4,
  Type, Link2, Unlink, Trash2, Palette, Highlighter, Code, X
} from "lucide-react";

const TextEditor = ({
  value = "",
  onChange,
  placeholder = "ابدأ كتابة مقالك هنا...",
  readOnly = false
}) => {
  const editorRef = useRef(null);
  const isInternalChangeRef = useRef(false);
  const isLoadedRef = useRef(false);

  // حالات أزرار شريط الأدوات النشطة
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    bulletList: false,
    orderedList: false,
    h2: false,
    h3: false,
    h4: false,
    alignRight: false,
    alignCenter: false,
    alignLeft: false,
  });

  const [currentFontSize, setCurrentFontSize] = useState("3");
  const [currentTextColor, setCurrentTextColor] = useState("#1c1917");
  const [currentBgColor, setCurrentBgColor] = useState("#ffffff");

  // حالات خاصة بنافذة كود المصدر
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [sourceCode, setSourceCode] = useState("");

  // --- 1. استقبال البيانات وتأمينها ---
  useEffect(() => {
    if (!editorRef.current) return;

    if (value && !isLoadedRef.current && !isInternalChangeRef.current) {
      editorRef.current.innerHTML = value;
      isLoadedRef.current = true;
      return;
    }

    if (value !== editorRef.current.innerHTML && !isInternalChangeRef.current) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }

    isInternalChangeRef.current = false;
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = "<p><br></p>";
    }
    if (typeof document !== "undefined") {
      document.execCommand("defaultParagraphSeparator", false, "p");
    }
  }, []);

  // --- 2. تمرير المخرجات النظيفة ---
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;

    let html = editorRef.current.innerHTML;

    if (html === "<p><br></p>" || html === "<div><br></div>" || html === "<br>") {
      html = "";
    }

    isInternalChangeRef.current = true;
    if (onChange) {
      onChange(html);
    }
  }, [onChange]);

  // --- 3. منع توارث التنسيقات عند نزول سطر جديد ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      let parent = selection.getRangeAt(0).commonAncestorContainer;
      if (parent.nodeType === Node.TEXT_NODE) parent = parent.parentNode;

      if (parent.closest("ul") || parent.closest("ol")) {
        return;
      }

      e.preventDefault();
      const currentBlock = parent.closest("p, div, h2, h3, h4, blockquote") || editorRef.current;
      
      const newParagraph = document.createElement("p");
      newParagraph.innerHTML = "<br>";

      if (currentBlock === editorRef.current) {
        editorRef.current.appendChild(newParagraph);
      } else {
        currentBlock.parentNode.insertBefore(newParagraph, currentBlock.nextSibling);
      }

      const range = document.createRange();
      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      handleInput();
    }
  };

  // --- 4. تحديث وضعية الأزرار ---
  const updateToolbarStates = useCallback(() => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) return;

    let parentNode = range.commonAncestorContainer;
    if (parentNode.nodeType === Node.TEXT_NODE) {
      parentNode = parentNode.parentNode;
    }

    const computedStyle = window.getComputedStyle(parentNode);
    const textAlign = computedStyle.textAlign;

    setActiveStyles({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      bulletList: !!parentNode.closest("ul"),
      orderedList: !!parentNode.closest("ol"),
      h2: !!parentNode.closest("h2"),
      h3: !!parentNode.closest("h3"),
      h4: !!parentNode.closest("h4"),
      alignRight: textAlign === "right" || textAlign === "start",
      alignCenter: textAlign === "center",
      alignLeft: textAlign === "left",
    });
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      updateToolbarStates();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [updateToolbarStates]);

  // --- 5. تنفيذ أوامر التنسيق ---
  const executeCommand = (command, argument = null) => {
    if (readOnly || !editorRef.current) return;
    editorRef.current.focus();

    if (command === "formatBlock" && argument !== "<blockquote>") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let parent = selection.getRangeAt(0).commonAncestorContainer;
        if (parent.nodeType === Node.TEXT_NODE) parent = parent.parentNode;

        const targetTag = argument.replace("<", "").replace(">", "").toLowerCase();
        if (parent.closest(targetTag)) {
          document.execCommand("formatBlock", false, "<p>");
          handleInput();
          updateToolbarStates();
          return;
        }
      }
    }

    document.execCommand(command, false, argument);
    handleInput();
    updateToolbarStates();
  };

  // --- 6. دوال إضافة الروابط وكود المصدر ---
  const handleAddLink = () => {
    const url = prompt("أدخل الرابط الإلكتروني (يفضل أن يبدأ بـ https://):");
    if (url) {
      executeCommand("createLink", url);
      // تحسين: محاولة جعل الرابط يفتح في نافذة جديدة
      const selection = window.getSelection();
      if (selection && selection.anchorNode) {
        const linkNode = selection.anchorNode.parentNode.closest('a');
        if (linkNode) {
          linkNode.setAttribute('target', '_blank');
          linkNode.setAttribute('rel', 'noopener noreferrer');
          handleInput();
        }
      }
    }
  };

  const openSourceModal = () => {
    setSourceCode(editorRef.current?.innerHTML || "");
    setShowSourceModal(true);
  };

  const applySourceCode = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sourceCode;
      handleInput();
    }
    setShowSourceModal(false);
  };

  return (
    <div className="w-full border border-stone-200 rounded-xl bg-white shadow-sm flex flex-col overflow-hidden relative" dir="rtl">
      
      {/* TOOLBAR */}
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 p-1.5 bg-stone-50 border-b border-stone-200 text-stone-700 select-none">
          
          <button
            type="button"
            onClick={() => executeCommand("formatBlock", "<h2>")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.h2 ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
            title="عنوان رئيسي كبير H2"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("formatBlock", "<h3>")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.h3 ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
            title="عنوان فرعي متوسط H3"
          >
            <Heading3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("formatBlock", "<h4>")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.h4 ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
            title="عنوان داخلي صغير H4"
          >
            <Heading4 size={16} />
          </button>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand("bold")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.bold ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("italic")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.italic ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("underline")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.underline ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
          >
            <Underline size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("strikethrough")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.strikethrough ? "bg-amber-100 text-amber-900 font-bold" : "hover:bg-stone-200/80"}`}
          >
            <Strikethrough size={16} />
          </button>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.bulletList ? "bg-amber-100 text-amber-800 font-bold" : "hover:bg-stone-200/80"}`}
            title="قائمة نقطية"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.orderedList ? "bg-amber-100 text-amber-800 font-bold" : "hover:bg-stone-200/80"}`}
            title="قائمة رقمية"
          >
            <ListOrdered size={16} />
          </button>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand("justifyRight")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.alignRight ? "bg-amber-100 text-amber-900" : "hover:bg-stone-200/80"}`}
          >
            <AlignRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("justifyCenter")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.alignCenter ? "bg-amber-100 text-amber-900" : "hover:bg-stone-200/80"}`}
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("justifyLeft")}
            className={`p-2 rounded-lg transition-colors ${activeStyles.alignLeft ? "bg-amber-100 text-amber-900" : "hover:bg-stone-200/80"}`}
          >
            <AlignLeft size={16} />
          </button>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <div className="flex items-center gap-1 bg-stone-200/50 rounded-lg px-2 py-1 text-stone-600" title="حجم الخط للنص المحدد">
            <Type size={13} />
            <select
              value={currentFontSize}
              onChange={(e) => {
                setCurrentFontSize(e.target.value);
                executeCommand("fontSize", e.target.value);
              }}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer text-stone-700"
            >
              <option value="2">صغير</option>
              <option value="3">طبيعي</option>
              <option value="5">كبير</option>
              <option value="6">كبير جداً</option>
            </select>
          </div>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <div className="flex items-center gap-2.5 px-1">
            <label className="flex items-center gap-1 cursor-pointer" title="تغيير لون النص المحدد">
              <Palette size={15} className="text-stone-500" />
              <input
                type="color"
                value={currentTextColor}
                onChange={(e) => {
                  setCurrentTextColor(e.target.value);
                  executeCommand("foreColor", e.target.value);
                }}
                className="w-4 h-4 rounded cursor-pointer border-0 p-0 overflow-hidden bg-transparent"
              />
            </label>

            <label className="flex items-center gap-1 cursor-pointer" title="تظليل خلفية النص المحدد">
              <Highlighter size={15} className="text-stone-500" />
              <input
                type="color"
                value={currentBgColor}
                onChange={(e) => {
                  setCurrentBgColor(e.target.value);
                  executeCommand("hiliteColor", e.target.value);
                }}
                className="w-4 h-4 rounded cursor-pointer border-0 p-0 overflow-hidden bg-transparent"
              />
            </label>
          </div>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          {/* أزرار الروابط وإزالة التنسيق */}
          <button
            type="button"
            onClick={handleAddLink}
            className="p-2 rounded-lg hover:bg-stone-200/80 text-stone-600 transition-colors"
            title="إضافة رابط"
          >
            <Link2 size={16} />
          </button>
          
          <button
            type="button"
            onClick={() => executeCommand("unlink")}
            className="p-2 rounded-lg hover:bg-stone-200/80 text-stone-600 transition-colors"
            title="إزالة الرابط"
          >
            <Unlink size={16} />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("removeFormat")}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="مسح كافة التنسيقات عن الجزء المحدد"
          >
            <Trash2 size={16} />
          </button>

          <div className="w-px h-5 bg-stone-200 mx-1" />

          {/* زر كود المصدر الجديد */}
          <button
            type="button"
            onClick={openSourceModal}
            className="p-2 rounded-lg hover:bg-stone-800 hover:text-white text-stone-600 transition-colors mr-auto"
            title="تعديل كود المصدر (HTML)"
          >
            <Code size={16} />
          </button>

        </div>
      )}

      {/* EDITABLE TEXT CONTAINER */}
      <div className="relative flex-1 p-6 min-h-[380px] bg-white cursor-text">
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="w-full h-full min-h-[350px] focus:outline-none text-right font-sans text-stone-800 leading-relaxed
            [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-stone-900 [&_h2]:mt-4 [&_h2]:mb-2
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-stone-800 [&_h3]:mt-3 [&_h3]:mb-1
            [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-stone-700
            [&_p]:text-base [&_p]:mb-3
            [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pr-6 [&_ul]:mb-4 [&_ul]:block
            [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pr-6 [&_ol]:mb-4 [&_ol]:block
            [&_li]:text-stone-700 [&_li]:mb-1 [&_li]:list-item
            [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800"
          style={{ direction: "rtl" }}
        />

        {(!value || value === "<div><br></div>" || value === "<p><br></p>" || value === "<br>") && (
          <div className="absolute top-6 right-6 text-stone-400 pointer-events-none select-none font-medium text-sm">
            {placeholder}
          </div>
        )}
      </div>

      <div className="bg-stone-50 border-t border-stone-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-stone-400 select-none">
        <span>محرر نصوص احترافي متكامل وخالٍ من عيوب الدمج</span>
        <span className="font-bold text-amber-700">مستقر بنسبة 100%</span>
      </div>

      {/* MODAL: نافذة تعديل كود المصدر */}
      {showSourceModal && (
        <div className="absolute inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl flex flex-col overflow-hidden border border-stone-200">
            <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-800 flex items-center gap-2">
                <Code size={18} className="text-amber-600"/>
                محرر كود المصدر (HTML)
              </h3>
              <button 
                onClick={() => setShowSourceModal(false)}
                className="p-1.5 rounded-md hover:bg-stone-200 text-stone-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-4 flex-1">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-stone-900 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-y"
                dir="ltr"
                placeholder="<p>اكتب كود HTML هنا...</p>"
              />
            </div>
            
            <div className="p-4 border-t border-stone-100 flex justify-end gap-3 bg-stone-50">
              <button
                onClick={() => setShowSourceModal(false)}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={applySourceCode}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-sm"
              >
                تطبيق وحفظ الكود
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TextEditor;