import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const EmployeeList = ({ onEdit }) => {
    const [employees, setEmployees] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const BACKEND_URL = "https://photography-xzfi.onrender.com";
    const API_URL = "https://photography-xzfi.onrender.com/api/employees/allemployees";
    const API_URL_Delete = "https://photography-xzfi.onrender.com/api/employees";


    /* ================= FETCH ================= */
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch(API_URL);
            const result = await res.json();
            if (result.success) {
                setEmployees(result.data);
                setFiltered(result.data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ================= SEARCH ================= */
    useEffect(() => {
        const value = search.toLowerCase();
        const data = employees.filter(emp =>
            `${emp.firstName} ${emp.lastName} ${emp.employeeId} ${emp.email} ${emp.department}`
                .toLowerCase()
                .includes(value)
        );
        setFiltered(data);
    }, [search, employees]);

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        try {

            const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

    if (!confirmDelete) return;
    
            const res = await fetch(`${API_URL_Delete}/delete/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                setEmployees(prev => prev.filter(emp => emp._id !== id));
                setFiltered(prev => prev.filter(emp => emp._id !== id));
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };



    /* ================= COLUMNS ================= */
    const columns = useMemo(
        () => [
            {
                name: "Emp ID",
                selector: row => row.employeeId,
                sortable: true,
                style: {
                    minWidth: "120px",
                },
            },
            {
                name: "Name",
                cell: row => (
                    <button
                        onClick={() => setSelectedEmployee(row)}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {row.firstName} {row.lastName}
                    </button>
                ),
                sortable: true,
                style: {
                    minWidth: "180px",
                },
            },
            {
                name: "Phone", selector: row => row.phone, style: {
                    minWidth: "150px",
                },
            },
            {
                name: "Email", selector: row => row.email, style: {
                    minWidth: "240px",
                },
            },
            {
                name: "Job Title", selector: row => row.jobTitle, style: {
                    minWidth: "200px",
                },
            },
            {
                name: "Department", selector: row => row.department, style: {
                    minWidth: "150px",
                },
            },
            {
                name: "Role", selector: row => row.role, style: {
                    minWidth: "150px",
                },
            },
            {
                name: "Actions",
                cell: row => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedEmployee(row)}
                            className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                        >
                            View
                        </button>

                        <button
                            onClick={() => onEdit(row)}
                            className="rounded bg-amber-500 px-2 py-1 text-xs text-white"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(row._id)}
                            className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                        >
                            Delete
                        </button>
                    </div>
                ),
                ignoreRowClick: true,
                style: {
                    minWidth: "190px", // ✅ correct way
                },
            },

        ],
        []
    );

    const Section = ({ title, children }) => (
        <div>
            <h4 className="mb-3 text-sm font-semibold uppercase text-slate-500">
                {title}
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                {children}
            </div>
        </div>
    );

    const Info = ({ label, value }) => (
        <div className="rounded-md bg-slate-50 px-3 py-2">
            <div className="text-xs font-medium text-slate-500">{label}</div>
            <div className="font-medium text-slate-800">{value || "—"}</div>
        </div>
    );

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#1e293b", // slate-800
            },
        },
        headCells: {
            style: {
                color: "#f8fafc", // white
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
            },
        },
    };


    /* ================= UI ================= */
    return (
        <section className={`${darkMode ? "bg-slate-900" : "bg-slate-100"} min-h-screen px-6 `}>
            <div className="rounded-xl bg-white shadow-lg dark:bg-slate-950">


                {/* TABLE */}
                <DataTable
                    columns={columns}
                    data={filtered}
                    progressPending={loading}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 15, 20, 25]}
                    responsive
                    customStyles={customStyles}
                />
            </div>

            {/* ================= EMPLOYEE DETAILS MODAL ================= */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="relative w-full max-w-3xl rounded-xl bg-white shadow-2xl animate-scaleIn">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedEmployee(null)}
                            className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>

                        {/* HEADER */}
                        <div className="flex items-center gap-4 border-b px-6 py-5">
                            <img
                                src={
                                    selectedEmployee.profilePicture
                                        ? `${BACKEND_URL}/uploads/${selectedEmployee.profilePicture}`
                                        : `https://ui-avatars.com/api/?name=${selectedEmployee.firstName}+${selectedEmployee.lastName}`
                                }
                                alt="Profile"
                                className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-500"
                            />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-800">
                                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    <span>Role : </span> {selectedEmployee.role}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {selectedEmployee.jobTitle} • {selectedEmployee.department}
                                </p>

                            </div>
                        </div>

                        {/* BODY */}
                        <div className="max-h-[65vh] overflow-y-auto px-6 py-5 space-y-6">

                            {/* PERSONAL */}
                            <Section title="Personal Information">
                                <Info label="Gender" value={selectedEmployee.gender} />
                                <Info label="Marital Status" value={selectedEmployee.maritalStatus} />
                                <Info label="Nationality" value={selectedEmployee.nationality} />
                                <Info label="Phone" value={selectedEmployee.phone} />
                                <Info label="Email" value={selectedEmployee.email} />
                                <Info label="Temporary Address" value={selectedEmployee.tempAddress} />
                                <Info label="Permanent Address" value={selectedEmployee.permAddress} />
                            </Section>

                            {/* JOB */}
                            <Section title="Job Information">
                                <Info label="Employee ID" value={selectedEmployee.employeeId} />
                                <Info label="Job Title" value={selectedEmployee.jobTitle} />
                                <Info label="Department" value={selectedEmployee.department} />
                                <Info label="Supervisor" value={selectedEmployee.supervisor} />
                                <Info label="Employment Type" value={selectedEmployee.employmentType} />
                                <Info label="Salary" value={`₹${selectedEmployee.salary}`} />
                                <Info
                                    label="Joining Date"
                                    value={
                                        selectedEmployee.dateOfJoining
                                            ? new Date(selectedEmployee.dateOfJoining).toLocaleDateString("en-IN")
                                            : "—"
                                    }
                                />
                            </Section>

                            {/* EMERGENCY */}
                            <Section title="Emergency Contact">
                                <Info label="Name" value={selectedEmployee.emergencyName} />
                                <Info label="Relation" value={selectedEmployee.emergencyRelation} />
                                <Info label="Phone" value={selectedEmployee.emergencyPhone} />
                            </Section>

                            {/* ROLE */}
                            <Section title="ROLE">
                                <Info label="role" value={selectedEmployee.role} />

                            </Section>
                        </div>

                        {/* FOOTER */}
                        <div className="border-t px-6 py-4">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default EmployeeList;
