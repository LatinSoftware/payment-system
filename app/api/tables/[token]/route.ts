import { NextRequest, NextResponse } from "next/server";

const tables: ITable[] = [
    {
        token: "adad9dad-e7fc-43f0-8c8d-415438dc18a1",
        name: "Mesa 1",
    },
    {
        token: "adad9dad-e7fc-43f0-8c8d-415438dc18a2",
        name: "Mesa 2",
    },
];

export async function GET(request: NextRequest, {params}: RouteParams):Promise<NextResponse>{
    
    const { token } = await params;
    console.log("creating cookie with token: ", token);
    if(!token) 
        return NextResponse.json({error: "Token is required"}, {status: 400});

    const table = tables.find((item) => item.token === token);
    
    if(!table) 
        return NextResponse.json({error: "Table not found"}, {status: 404});

    const response = NextResponse.redirect(new URL(`/`, request.url));
    response.cookies.set('tableToken', table.token, { httpOnly: false, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });
    response.cookies.set('tableName', table.name, { httpOnly: false, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });

    return response;

}

export async function POST(request: NextRequest): Promise<NextResponse> {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405, headers: { Allow: 'GET' } }
    );
  }