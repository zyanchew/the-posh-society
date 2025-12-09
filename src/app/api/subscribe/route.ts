import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/saveSubscriber";

type SubscribePayload = {
  email: string;
};

const isValidPayload = (payload: unknown): payload is SubscribePayload =>
  !!payload && typeof payload === "object" && typeof (payload as SubscribePayload).email === "string";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Invalid email payload." }, { status: 400 });
    }

    const { email } = body;
    const result = await saveSubscriber(email);
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message ?? "Error" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
