import { NextResponse, NextRequest } from "next/server";
import client from "../../../lib/mongoConnect";
import { getErrorMessage } from "utils/serverFunctions";
import {ObjectId}  from "mongodb";
import extractObj from "utils/extractObj";

interface TodoTask {
  isCompleted : boolean;   
  id : string;
  task: string;
}


export async function PUT(req: NextRequest) {
  try {
    const clientIntance = await client();
    const collection = clientIntance.db("TodoApp").collection("Todo");
    const body:TodoTask = await req.json(); 
    const updateItems = extractObj<TodoTask>(body, ["task", "isCompleted"]);
    const objectId = new ObjectId(body.id);
    await collection.updateOne({_id : objectId}, {$set : {...updateItems}});
    return NextResponse.json(
      {
        status: "ok",
      },
      { status: 201}
    );
  } catch (err) {
    const message: string = getErrorMessage(err);
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
