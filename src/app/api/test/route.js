import connectionDb from '../../../libs/mongodb';
import Test from '../../../models/test';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, des } = await request.json();
        console.log("title",title);

        await connectionDb();  // Connect to the database
        await Test.create({ title, des });

        return NextResponse.json(
            { message: "Topic is created" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating topic:", error);
        return NextResponse.json(
            { message: "Failed to create topic", error: error.message },
            { status: 500 }
        );
    }
}
