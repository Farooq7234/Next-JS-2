import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
    const userId = getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")

    if(!user){
        return NextResponse.json(
            {
                error:"Invalid token",
                status:400
            }
        )
    }

    return NextResponse.json({
        message: "User found",
        data:user
    })
}