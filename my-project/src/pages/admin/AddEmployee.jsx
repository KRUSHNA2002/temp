import React, { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
// import { Link } from "react-router-dom";
const AddEmployee = () => {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
        tempAddress: "",
        permAddress: "",
        employeeId: "",
        jobTitle: "",
        department: "",
        supervisor: "",
        salary: "",
        employmentType: "",
        dateOfJoining: "",
        contractStart: "",
        contractEnd: "",
        emergencyName: "",
        emergencyRelation: "",
        emergencyPhone: "",
        profilePicture: null,
        idDocuments: null,
    });

    const [errors, setErrors] = useState({});
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listKey, setListKey] = useState(0);


    // For EDIT THE EMPLOYEE STATE

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleEdit = (employee) => {
        setFormData({
            firstName: employee.firstName || "",
            lastName: employee.lastName || "",
            dateOfBirth: employee.dateOfBirth
                ? employee.dateOfBirth.slice(0, 10)
                : "",
            gender: employee.gender || "",
            maritalStatus: employee.maritalStatus || "",
            nationality: employee.nationality || "",
            phone: employee.phone || "",
            email: employee.email || "",
            tempAddress: employee.tempAddress || "",
            permAddress: employee.permAddress || "",
            employeeId: employee.employeeId || "",
            jobTitle: employee.jobTitle || "",
            department: employee.department || "",
            supervisor: employee.supervisor || "",
            salary: employee.salary?.toString() || "",
            employmentType: employee.employmentType || "",
            dateOfJoining: employee.dateOfJoining
                ? employee.dateOfJoining.slice(0, 10)
                : "",
            contractStart: employee.contractStart
                ? employee.contractStart.slice(0, 10)
                : "",
            contractEnd: employee.contractEnd
                ? employee.contractEnd.slice(0, 10)
                : "",
            emergencyName: employee.emergencyName || "",
            emergencyRelation: employee.emergencyRelation || "",
            emergencyPhone: employee.emergencyPhone || "",
            role: employee.role || "",

            // 👇 NEVER prefill these
            password: "",
            cpassword: "",
            profilePicture: null,
            idDocuments: null,
        });

        setEditId(employee._id);
        setIsEdit(true);
        setShowModal(true);
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (files) setFormData({ ...formData, [name]: files[0] });
        else setFormData({ ...formData, [name]: value });
    };

    // 🔹 Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
        if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required";

        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";

        if (!formData.tempAddress.trim()) newErrors.tempAddress = "Temporary address is required";
        if (!formData.permAddress.trim()) newErrors.permAddress = "Permanent address is required";

        if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
        if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!formData.department) newErrors.department = "Department is required";
        if (!formData.supervisor) newErrors.supervisor = "Supervisor is required";

        if (!formData.salary) newErrors.salary = "Salary is required";
        if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
        if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of joining is required";

        if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency name is required";
        if (!formData.emergencyRelation) newErrors.emergencyRelation = "Relation is required";
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required";

        // For EDIT TIME EMPLOYEE Validation for profile and document not require USE FUNCTION --------------------------------------------------------------------

        // if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
        // if (!formData.idDocuments) newErrors.idDocuments = "ID document is required";


        // For EDIT TIME EMPLOYEE Validation for profile and document not require USE FUNCTION --------------------------------------------------------------------

        if (!isEdit) {
            if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
            if (!formData.idDocuments) newErrors.idDocuments = "ID document is required";
        }


        if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency name is required";
        if (!formData.emergencyRelation) newErrors.emergencyRelation = "Relation is required";
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // For EDIT THE EMPLOYEE ADD USE FUNCTION --------------------------------------------------------------------

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateForm()) return;

    //     const data = new FormData();
    //     Object.keys(formData).forEach((k) => data.append(k, formData[k]));

    //     try {
    //         const res = await fetch("https://photography-xzfi.onrender.com/api/employees/add", {
    //             method: "POST",
    //             body: data,
    //         });
    //         const result = await res.json();
    //         alert(result.message);
    //         setListKey(prev => prev + 1); // ✅ FORCE RELOAD EmployeeList
    //         setShowModal(false);
    //     } catch {
    //         alert("Failed to add employee");
    //     }
    // };



    // For EDIT THE EMPLOYEE EDIT USE FUNCTION ------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                data.append(key, formData[key]);
            }
        });

        const url = isEdit
            ? `https://photography-xzfi.onrender.com/api/employees/update/${editId}`
            : `https://photography-xzfi.onrender.com/api/employees/add`;

        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                body: data,
            });

            const result = await res.json();
            alert(result.message);

            setShowModal(false);
            setIsEdit(false);
            setEditId(null);
            setListKey(prev => prev + 1);
        } catch (err) {
            alert("Operation failed");
        }
    };


    const inputClass = (name) =>
        `w-full px-4 py-3 border rounded ${errors[name] ? "border-red-500" : "border-gray-400"
        }`;

    const errorText = (name) =>
        errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        );


    return (
        <>
            {/* PAGE HEADER */}
            {/* PAGE HEADER */}
            <section className="px-6 py-4">
                <div className="container flex justify-between items-center">
                    <h2 className="text-3xl font-semibold">
                        {isEdit ? "Edit Employee Details" : "Employee Management"}
                    </h2>

                    {/* ✅ ADD EMPLOYEE BUTTON (OPEN MODAL) */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsEdit(false);
                            setEditId(null);
                            setFormData({
                                firstName: "",
                                lastName: "",
                                dateOfBirth: "",
                                gender: "",
                                maritalStatus: "",
                                nationality: "",
                                phone: "",
                                email: "",
                                password: "",
                                cpassword: "",
                                role: "",
                                tempAddress: "",
                                permAddress: "",
                                employeeId: "",
                                jobTitle: "",
                                department: "",
                                supervisor: "",
                                salary: "",
                                employmentType: "",
                                dateOfJoining: "",
                                contractStart: "",
                                contractEnd: "",
                                emergencyName: "",
                                emergencyRelation: "",
                                emergencyPhone: "",
                                profilePicture: null,
                                idDocuments: null,
                            });
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded"
                    >
                        Add Employee
                    </button>
                </div>
                <hr className="my-4" />
            </section>


            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-blue-50 w-[95%] md:w-[85%] h-[90vh] overflow-y-auto rounded-lg p-6 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-xl text-red-600"
                        >
                            ✕
                        </button>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                            {/* Heading Section */}
                            {/* <section className="mb-8">
                       
                        <div className="container">
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 items-center">
                                <div>
                                    <h2 className="text-3xl font-semibold text-gray-800">
                                        Add Employee
                                    </h2>
                                </div>
                                <div className="sm:text-right">
                                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">
                                       <Link to="/employee-list" >List of Employees</Link>
                                    </button>
                                </div>
                            </div>

                            <hr className="my-4" />
                        </div>

                    </section> */}

                            {/* Employee Personal Information Section */}
                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Employee Personal Information:
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={inputClass("firstName")}
                                                placeholder="First Name"
                                            />
                                            {errorText("firstName")}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={inputClass("lastName")}
                                                placeholder="Last Name"
                                            />
                                            {errorText("lastName")}
                                        </div>
                                        <div>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className={inputClass("gender")}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errorText("gender")}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

                                        <div>
                                            <div>
                                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                    className={inputClass("dateOfBirth")}
                                                />
                                                {errorText("dateOfBirth")}
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <select
                                                name="maritalStatus"
                                                value={formData.maritalStatus}
                                                onChange={handleChange}
                                                className={inputClass("maritalStatus")}
                                            >
                                                <option value="">Select Marital Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                            </select>
                                            {errorText("maritalStatus")}
                                        </div>

                                        <div className="mt-5">
                                            <input
                                                type="text"
                                                name="nationality"
                                                value={formData.nationality}
                                                onChange={handleChange}
                                                className={inputClass("nationality")}
                                                placeholder="Nationality"
                                            />
                                            {errorText("nationality")}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Employee Contact Information Section */}
                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Employee Contact Information:
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={inputClass("phone")}
                                                placeholder="Phone Number"
                                            />
                                            {errorText("phone")}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={inputClass("email")}
                                                placeholder="Email Address"
                                            />
                                            {errorText("email")}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                name="tempAddress"
                                                value={formData.tempAddress}
                                                onChange={handleChange}
                                                className={inputClass("tempAddress")}
                                                placeholder="Temporary Address"
                                            />
                                            {errorText("tempAddress")}
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="permAddress"
                                                value={formData.permAddress}
                                                onChange={handleChange}
                                                className={inputClass("permAddress")}
                                                placeholder="Permanent Address"
                                            />
                                            {errorText("permAddress")}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Employment Details Section */}
                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Employment Details:
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        
                                        <input
                                            type="text"
                                            name="employeeId"
                                            value={formData.employeeId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            placeholder="Employee ID"
                                        />
                                         <div>
                                        <select
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                        >
                                            <option value="">Select Job Title</option>
                                            <option value="Fullstack Developer">Fullstack Developer</option>
                                            <option value="Frontend Developer">Frontend Developer</option>
                                        </select>
                                        {errorText("jobTitle")}
                                        </div>

                                        <div>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Designer">Designer</option>
                                            <option value="IT">IT</option>
                                        </select>
                                         {errorText("department")}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                                        <div>
                                        <select
                                            name="supervisor"
                                            value={formData.supervisor}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                        >
                                            <option value="">Select Supervisor</option>
                                            <option value="TL">TL</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Directer">Directer</option>
                                        </select>
                                        {errorText("department")}
                                        </div>
                                        <div>
                                        <input
                                            type="number"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            placeholder="Salary"
                                        />
                                        {errorText("salary")}
                                        </div>
                                         <div>
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                        >
                                            <option value="">Select Employment Type</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Intern">Intern</option>
                                        </select>
                                        {errorText("employmentType")}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                                        <div>
                                            <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">Date of Joining</label>
                                            <input
                                                type="date"
                                                name="dateOfJoining"
                                                value={formData.dateOfJoining}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            />
                                            {errorText("dateOfJoining")}
                                        </div>

                                        {formData.employmentType === "Contract" && (
                                            <>
                                                <div>
                                                    <label htmlFor="contractStart" className="block text-sm font-medium text-gray-700">Contract Start</label>
                                                    <input
                                                        type="date"
                                                        name="contractStart"
                                                        value={formData.contractStart}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                                    />
                                                    
                                                </div>
                                                <div>
                                                    <label htmlFor="contractEnd" className="block text-sm font-medium text-gray-700">Contract End</label>
                                                    <input
                                                        type="date"
                                                        name="contractEnd"
                                                        value={formData.contractEnd}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Emergency Contact Section */}
                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Emergency Contact Information:
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                        <input
                                            type="text"
                                            name="emergencyName"
                                            value={formData.emergencyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            placeholder="Emergency Contact Name"
                                        />
                                        {errorText("emergencyName")}
                                        </div>
                                       <div>
                                        <select
                                            name="emergencyRelation"
                                            value={formData.emergencyRelation}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                        >
                                            <option value="">Select Relationship</option>
                                            <option value="Spouse">Spouse</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Sibling">Sibling</option>
                                            <option value="Friend">Friend</option>
                                        </select>
                                        {errorText("emergencyRelation")}
                                       
                                        </div>
                                        <div>
                                        <input
                                            type="text"
                                            name="emergencyPhone"
                                            value={formData.emergencyPhone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            placeholder="Emergency Contact Phone"
                                        />
                                        {errorText("emergencyPhone")}
                                         </div>
                                    </div>
                                </div>
                            </section>

                            {/* File Upload Section */}
                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Upload Documents:
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold">Profile Picture</label>
                                            <input
                                                type="file"
                                                name="profilePicture"
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            />
                                            {errorText("profilePicture")}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold">Identification Documents</label>
                                            <input
                                                type="file"
                                                name="idDocuments"
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            />
                                            {errorText("idDocuments")}
                                        </div>
                                    </div>
                                </div>
                            </section>


                            {/* Employee Credential Information Section */}

                            <section className="mb-8">
                                <div className="container">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">
                                        Employee Credential Information:
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={inputClass("password")}
                                                placeholder="Password"
                                            />
                                            {errorText("password")}
                                        </div>

                                        <div>
                                            <input
                                                type="password"
                                                name="cpassword"
                                                value={formData.cpassword}
                                                onChange={handleChange}
                                                className={inputClass("cpassword")}
                                                placeholder="Confirm Password"
                                            />
                                            {errorText("cpassword")}
                                        </div>

                                        <div>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-500 rounded-md"
                                            >
                                                <option value="">Select Role</option>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="staff">Staff</option>

                                            </select>
                                            {errorText("role")}
                                        </div>


                                    </div>

                                </div>
                            </section>

                            {/* Submit Button */}
                            {/* <section>
                        <div className="container flex justify-center">
                            <button
                                className="bg-blue-600 py-3 px-6 rounded-md font-semibold text-white text-lg"
                                type="submit"
                            >
                                Add Employee
                            </button>
                        </div>
                    </section> */}

                            <div className="flex justify-center mt-8">
                                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded">
                                    {isEdit ? "Update Employee" : "Add Employee"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}


            <section>
                <EmployeeList key={listKey} onEdit={handleEdit} />
            </section>



        </>
    );
};

export default AddEmployee;
