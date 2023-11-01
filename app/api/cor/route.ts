import { NextResponse } from 'next/server';
import schema from './schema';

/* const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
 */
export async function GET() {
  console.log('Связььь!!!');
  return NextResponse.json('Приёммм!!!');
}

/* interface IBody {
  name?: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: IBody = await request.json();
  const validation = schema.safeParse(body);
  console.log('validation:', validation);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json({ message: body.name });
} */
