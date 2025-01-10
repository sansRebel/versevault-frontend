"use client";

import { useState, useEffect } from "react";
import { fetchBlogs } from "@/services/blogServices";
import { Blog } from "@/types";

export const useFetchBlogs = () =>{
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() =>{
        const loadBlogs = async () => {
            try {
                const data = await fetchBlogs();
                setBlogs(data)
            }catch(error) {
                console.log("error fetching blogs", error);

            }finally{
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return {blogs, loading};
};

