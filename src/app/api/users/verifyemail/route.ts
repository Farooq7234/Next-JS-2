import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        // Get data of the user like token
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        // match the token with database

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now() }})

        if (!user) {
            return NextResponse.json({error: "Invalid Token"}, {status:400})
        }

        user.isVerified = true,
        user.verifyToken = undefined,
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message:"user verified successfully", success:true},{status:400},)

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}