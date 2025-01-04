"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";

export default function ProfilePage(){
    const user = {
        name: "Khaled",
        email: "Khaled@mail.com"
    };

    const handleEditAccount = () => {
        console.log("edit clicked");
    };

    const handleDeleteAccount = () =>{
        console.log("delete clicked")
    };

    return(
        <div className="min-h-screen bg-base-100">
            <section className="py-8">
                {/* User Information */}
                <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                <p className="text-lg mb-4">{user.email}</p>
                <div className="flex justify-center gap-4">
                    <Button label="Edit Account" styleType="primary" onClick={handleEditAccount} />
                    <Button label="Delete Account" styleType="danger" onClick={handleDeleteAccount} />
                </div>
                </div>

                {/* User Blogs */}
                <div>
                <h2 className="text-2xl font-bold text-center mb-8">My Blogs</h2>
                <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Example Blog Cards */}
                    <Card />
                    <Card />
                    <Card />
                </div>
                </div>
            </section>
    </div>
  );
}