import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMe } from "../api/me";
import { deleteStudent } from "../api/delete";
import { uploadVideo } from "../api/upload.ts";

const Dashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["userMe"],
        queryFn: getMe,
        enabled: !!token,
    });

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const { collegeUser, referrals = [] } = data || {};

    const enabledReferrals = referrals.filter((student: any) => student.isEnabled === true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        queryClient.clear();
        navigate("/login");
    };

    const handleCopyLink = () => {
        if (collegeUser?.referralCode) {
            const fullLink = `${window.location.origin}/school/${collegeUser.referralCode}`;
            navigator.clipboard.writeText(fullLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const uploadMutation = useMutation({
        mutationFn: uploadVideo,
    }); 

    const handleVideoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        studentId: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await uploadMutation.mutateAsync({ studentId, file });
                await queryClient.invalidateQueries({ queryKey: ["userMe"] });
            } catch (error) {
                console.error(error);
            }
        }
    };


    const deletemutation = useMutation({
        mutationFn: deleteStudent,

    });


    const handleDeleteStudent = async (studentId: string) => {
        try {
            await deletemutation.mutateAsync(studentId);
            await queryClient.invalidateQueries({ queryKey: ["userMe"] });
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        container: {
            padding: isMobile ? "20px 16px 120px 16px" : "40px 60px",
            backgroundColor: "#020617",
            minHeight: "100vh",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#f8fafc"
        },
        nav: {
            display: "flex",
            flexDirection: "row" as const,
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? "24px" : "40px"
        },
        referralCard: {
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            cursor: "pointer",
            transition: "all 0.2s"
        },
        logoutBtn: {
            padding: "12px 24px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600" as const,
            transition: "all 0.2s",
            width: isMobile ? "calc(100% - 32px)" : "auto",
            position: isMobile ? "fixed" as const : "static" as const,
            bottom: isMobile ? "20px" : "auto",
            left: isMobile ? "16px" : "auto",
            zIndex: 10,
            boxShadow: isMobile ? "0 -4px 20px rgba(0,0,0,0.5)" : "none"
        },
        statsContainer: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "40px"
        },
        card: {
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            padding: isMobile ? "24px" : "32px",
            borderRadius: "24px",
            border: "1px solid #334155",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
        },
        tableWrapper: {
            background: "#0f172a",
            borderRadius: "24px",
            border: "1px solid #1e293b",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)"
        },
        table: { width: "100%", borderCollapse: "separate" as const, borderSpacing: "0" },
        th: {
            textAlign: "left" as const,
            padding: "16px 24px",
            backgroundColor: "#1e293b",
            color: "#94a3b8",
            fontSize: "0.7rem",
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em"
        },
        td: {
            padding: "16px 24px",
            borderBottom: "1px solid #1e293b",
            fontSize: "0.95rem"
        },
        mobileRow: {
            padding: "20px",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px"
        },
        actionGroup: {
            display: "flex",
            alignItems: "center",
            gap: "12px"
        },
        uploadLabel: {
            backgroundColor: "#6366f1",
            color: "white",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "500",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none"
        },
        deleteBtn: {
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            fontSize: "0.85rem",
            fontWeight: "600",
            transition: "all 0.2s"
        },
        badge: {
            backgroundColor: "rgba(56, 189, 248, 0.1)",
            color: "#38bdf8",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "600",
            border: "1px solid rgba(56, 189, 248, 0.2)"
        },
        loader: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#020617",
            color: "#6366f1",
            fontSize: "1.2rem"
        }
    };

    if (isLoading) return <div style={styles.loader}>Loading...</div>;
    if (error) return <div style={styles.loader}>Error: {(error as any).message}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.nav}>
                <div>
                    <h1 style={{ margin: 0, fontSize: isMobile ? "1.8rem" : "2.5rem", letterSpacing: "-0.02em" }}>Overview</h1>
                    <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.9rem" }}>Manage your referrals and uploads</p>
                </div>
                {!isMobile && (
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Sign Out
                    </button>
                )}
            </div>

            <div
                style={styles.referralCard as any}
                onClick={handleCopyLink}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)")}
            >
                <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#6366f1", fontWeight: 700, textTransform: "uppercase" }}>Your Referral Link</p>
                    <p style={{ margin: "4px 0 0 0", fontSize: isMobile ? "0.85rem" : "1rem", color: "#f8fafc", opacity: 0.8 }}>
                        {window.location.origin}/school/{collegeUser?.referralCode}
                    </p>
                </div>
                <div style={{ backgroundColor: copied ? "#10b981" : "#6366f1", color: "white", padding: "8px 16px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {copied ? "Copied!" : "Copy"}
                </div>
            </div>

            <div style={styles.statsContainer}>
                <div style={styles.card}>
                    <p style={{ color: "#64748b", margin: "0 0 8px 0", fontSize: "0.75rem", fontWeight: "600" }}>REPRESENTATIVE</p>
                    <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{collegeUser?.name}</h2>
                </div>
                <div style={styles.card}>
                    <p style={{ color: "#64748b", margin: "0 0 8px 0", fontSize: "0.75rem", fontWeight: "600" }}>INSTITUTION</p>
                    <h2 style={{ margin: 0, fontSize: "1.4rem", color: "#6366f1" }}>{collegeUser?.collegeName}</h2>
                </div>
                <div style={styles.card}>
                    <p style={{ color: "#64748b", margin: "0 0 8px 0", fontSize: "0.75rem", fontWeight: "600" }}>TOTAL REFERRALS</p>
                    <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{enabledReferrals.length}</h2>
                </div>
            </div>

            <div style={styles.tableWrapper}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #1e293b" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>Enrolled Students</h3>
                </div>

                {isMobile ? (
                    <div>
                        {enabledReferrals.map((student: any) => (
                            <div key={student._id} style={styles.mobileRow}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ fontWeight: "600", color: "#f1f5f9" }}>{student.name}</div>
                                        <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{student.schoolName}</div>
                                    </div>
                                    <span style={styles.badge}>{student.standard}</span>
                                </div>
                                <div style={styles.actionGroup}>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        id={`upload-mob-${student._id}`}
                                        style={{ display: "none" }}
                                        onChange={(e) => handleVideoUpload(e, student._id)}
                                    />
                                    <label htmlFor={`upload-mob-${student._id}`} style={{ ...styles.uploadLabel, flex: 1 }}>
                                        Upload Video
                                    </label>
                                    <button
                                        onClick={() => handleDeleteStudent(student._id)}
                                        style={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Full Name</th>
                                <th style={styles.th}>School / College</th>
                                <th style={styles.th}>Grade</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enabledReferrals.map((student: any) => (
                                <tr key={student._id}>
                                    <td style={styles.td}><div style={{ fontWeight: "600" }}>{student.name}</div></td>
                                    <td style={styles.td}>{student.schoolName}</td>
                                    <td style={styles.td}>{student.standard}</td>
                                    <td style={styles.td}>
                                        <div style={styles.actionGroup}>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                id={`upload-${student._id}`}
                                                style={{ display: "none" }}
                                                onChange={(e) => handleVideoUpload(e, student.name)}
                                            />
                                            <label htmlFor={`upload-${student._id}`} style={styles.uploadLabel}>
                                                Upload Video
                                            </label>
                                            <button
                                                onClick={() => handleDeleteStudent(student._id)}
                                                style={styles.deleteBtn}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)"}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isMobile && (
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Sign Out
                </button>
            )}
        </div>
    );
};

export default Dashboard;