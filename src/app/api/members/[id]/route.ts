import supabase from "@/util/supabase";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (request: NextRequest, {params}: any): Promise<NextResponse<String>> => {
    let response = await supabase.from('member').select(`*`).eq('id', params.id)
    return new NextResponse(JSON.stringify(response.data ? response.data[0] : {}), {status: 200})
}

export const DELETE = async (request: NextRequest, {params}: any) => {
    let getResponse = await supabase.from('member').select(`*`).eq('id', params.id)
    console.log()
    if (getResponse.data?.length == 0) {
        return new NextResponse("Member not found", {status: 404})
    }
    let response = await supabase.from('member').delete().eq('id', params.id)
    console.log(response)
    return new NextResponse(null, {status: 204})
}