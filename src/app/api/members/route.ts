import {NextResponse} from "next/server";
import supabase from "@/util/supabase";

export const GET = async () => {
    let response = await supabase.from('member').select(`*`)
    return new NextResponse(JSON.stringify(response.data), {status: response.status})
}

export const POST = async (request: Request) => {
    let body = await request.json()
    let response = await supabase.from('member')
        .insert(body)
    return new NextResponse(JSON.stringify(response.statusText), {status: response.status})
}
