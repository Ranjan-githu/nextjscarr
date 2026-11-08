(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/interview/[interviewId]/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Interview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Interview() {
    _s();
    const { interviewId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [report, setReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interview.useEffect": ()=>{
            if (!interviewId) return;
            fetch(`/api/interview/report/${interviewId}`).then({
                "Interview.useEffect": async (r)=>{
                    if (r.status === 401) {
                        router.replace('/login');
                        return null;
                    }
                    return r.json();
                }
            }["Interview.useEffect"]).then({
                "Interview.useEffect": (d)=>setReport(d?.interviewReport || null)
            }["Interview.useEffect"]).finally({
                "Interview.useEffect": ()=>setLoading(false)
            }["Interview.useEffect"]);
        }
    }["Interview.useEffect"], [
        interviewId,
        router
    ]);
    const [downloading, setDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downloadError, setDownloadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    async function downloadPdf() {
        setDownloading(true);
        setDownloadError('');
        try {
            const r = await fetch(`/api/interview/resume/pdf/${interviewId}`, {
                method: 'POST',
                credentials: 'include'
            });
            if (!r.ok) {
                const data = await r.json().catch(()=>null);
                throw new Error(data?.message || 'Failed to generate resume PDF');
            }
            const blob = await r.blob();
            if (!blob.size) throw new Error('Generated resume PDF is empty');
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume_${interviewId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(()=>URL.revokeObjectURL(url), 1000);
        } catch (error) {
            setDownloadError(error instanceof Error ? error.message : 'Could not download the resume PDF');
        } finally{
            setDownloading(false);
        }
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "loading-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Loading report..."
        }, void 0, false, {
            fileName: "[project]/app/interview/[interviewId]/page.jsx",
            lineNumber: 2,
            columnNumber: 1430
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 1397
    }, this);
    if (!report) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Report not found"
        }, void 0, false, {
            fileName: "[project]/app/interview/[interviewId]/page.jsx",
            lineNumber: 2,
            columnNumber: 1488
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 1482
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "interview-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: report.title || 'Interview Report'
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1569
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Match score: ",
                            report.matchScore,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1612
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button primary-button",
                        onClick: downloadPdf,
                        disabled: downloading,
                        children: downloading ? 'Generating PDF...' : 'Generate Tailored Resume PDF'
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1652
                    }, this),
                    downloadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "error-message",
                        children: downloadError
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1828
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1561
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Technical Questions"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1895
                    }, this),
                    report.technicalQuestions?.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "q-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: q.question
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1998
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Intention:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 2022
                                        }, this),
                                        " ",
                                        q.intention
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2019
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Answer:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 2070
                                        }, this),
                                        " ",
                                        q.answer
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2067
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 1962
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1886
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Behavioral Questions"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 2140
                    }, this),
                    report.behavioralQuestions?.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "q-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: q.question
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2245
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: q.answer
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2266
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 2209
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 2131
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Preparation Plan"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 2314
                    }, this),
                    report.preparationPlan?.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: [
                                        "Day ",
                                        d.day,
                                        ": ",
                                        d.focus
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2392
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: d.tasks?.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: t
                                        }, i, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 2448
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 2423
                                }, this)
                            ]
                        }, d.day, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 2371
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 2305
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 1528
    }, this);
}
_s(Interview, "1NzONchOIKFYsbBfD2x7STaeSsY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Interview;
var _c;
__turbopack_context__.k.register(_c, "Interview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_1xye1_-j81ssp._.js.map