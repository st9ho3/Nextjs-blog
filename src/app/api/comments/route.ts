import { headers } from "next/headers";
import { comments } from "./data";
import { json } from "stream/consumers";

export const GET = async() => {
    return Response.json(comments)
}

export const POST = async(request: Request) => {
    const comment = await request.json()
    const newComment = 
    {
        id: comments.length + 1,
        text: comment.text
    }
    comments.push(newComment)
    return new Response(JSON.stringify(newComment), {
        headers: {"Content-Type": "application/json"},
        status: 201,
    })
}