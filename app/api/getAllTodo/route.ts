import { NextRequest, NextResponse } from "next/server";
import clientConnect from "../../../lib/mongoConnect";
import { getErrorMessage } from "utils/serverFunctions";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  try {
    const clientIntance = await clientConnect();
    const collection = clientIntance.db("TodoApp").collection("Todo");
    const AllTodos = await collection.find().toArray();
    revalidatePath("/");
    return NextResponse.json({ status: "ok", data: AllTodos });
  } catch (err: unknown) {
    return NextResponse.json(getErrorMessage(err), { status: 500 });
  }
}
