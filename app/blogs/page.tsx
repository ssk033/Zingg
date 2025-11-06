"use client"; // Ensure this runs on the client side

import { useState } from "react";
import { Add } from "@/components/AddBlog";
import { Blogs } from "@/components/Blogs";

export default function BlogsPage() {
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div>
            <Blogs />
            <button onClick={() => setShowAdd(true)}>Add</button>
            {showAdd && <Add />}
        </div>
    );
}
