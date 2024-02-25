import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "utils/getCollection";
import { getErrorMessage } from "utils/serverFunctions";

export async function DELETE(req:NextRequest) {
  try {
    const collection = await getCollection("TodoApp", "Todo");
    const {id}:{id:string} = await req.json();
    const objectId = new ObjectId(id);
    const deleteTodo = await collection.deleteOne({ _id: objectId });
    return NextResponse.json(
      { status: "ok", message: "Task deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    const message = getErrorMessage(err);
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}