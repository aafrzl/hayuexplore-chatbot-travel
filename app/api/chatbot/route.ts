import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let data = JSON.stringify(body);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}`,
      headers: { 
        'Content-Type': 'application/json', 
        'apikey': `${process.env.API_KEY}`
      },
      data : data
    }

    const response = await axios.request(config);

    return new NextResponse(JSON.stringify(response.data));
  } catch (error) {
    console.log("[ERROR_POST_CHATBOT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
