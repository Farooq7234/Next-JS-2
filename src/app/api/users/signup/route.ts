import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from '@/models/userModel'

// In next js everytime we have to connect with DB in each file
connect()

export async function  POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // check if the user is already exist
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exist"},{status:400})
        }

        // hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // send verification email

        await sendEmail({email, emailType: "VERIFY", userId:savedUser._id})

        return NextResponse.json({
            message: "User registered Successfully",
            success: true,
            savedUser
        })

    }  catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}