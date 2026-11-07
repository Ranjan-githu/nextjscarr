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
    async function downloadPdf() {
        const r = await fetch(`/api/interview/resume/pdf/${interviewId}`, {
            method: 'POST'
        });
        if (!r.ok) return;
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${interviewId}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "loading-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Loading report..."
        }, void 0, false, {
            fileName: "[project]/app/interview/[interviewId]/page.jsx",
            lineNumber: 2,
            columnNumber: 897
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 864
    }, this);
    if (!report) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Report not found"
        }, void 0, false, {
            fileName: "[project]/app/interview/[interviewId]/page.jsx",
            lineNumber: 2,
            columnNumber: 955
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 949
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
                        columnNumber: 1036
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
                        columnNumber: 1079
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button primary-button",
                        onClick: downloadPdf,
                        children: "Generate Tailored Resume PDF"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1119
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1028
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Technical Questions"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1238
                    }, this),
                    report.technicalQuestions?.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "q-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: q.question
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1341
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Intention:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 1365
                                        }, this),
                                        " ",
                                        q.intention
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1362
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Answer:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 1413
                                        }, this),
                                        " ",
                                        q.answer
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1410
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 1305
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1229
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Behavioral Questions"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1483
                    }, this),
                    report.behavioralQuestions?.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "q-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: q.question
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1588
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: q.answer
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1609
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 1552
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1474
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Preparation Plan"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/[interviewId]/page.jsx",
                        lineNumber: 2,
                        columnNumber: 1657
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
                                    columnNumber: 1735
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: d.tasks?.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: t
                                        }, i, false, {
                                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                            lineNumber: 2,
                                            columnNumber: 1791
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/[interviewId]/page.jsx",
                                    lineNumber: 2,
                                    columnNumber: 1766
                                }, this)
                            ]
                        }, d.day, true, {
                            fileName: "[project]/app/interview/[interviewId]/page.jsx",
                            lineNumber: 2,
                            columnNumber: 1714
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/[interviewId]/page.jsx",
                lineNumber: 2,
                columnNumber: 1648
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/interview/[interviewId]/page.jsx",
        lineNumber: 2,
        columnNumber: 995
    }, this);
}
_s(Interview, "l6KGKjFrvyzOWg3V0xWJ6Uhaf34=", false, function() {
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