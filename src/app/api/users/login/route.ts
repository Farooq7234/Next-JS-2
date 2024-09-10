import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody)
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }
        console.log("User exists")

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
        }
        console.log(user)
        // At this point the email and password of the user is correct

        // JSONWEBTOKEN
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        
        const response = NextResponse.json(
            {
                message:"User logged In Successfully",
                success:true
            }
        )
        console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET!);

        response.cookies.set("token", token, {httpOnly: true})

        return response

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}