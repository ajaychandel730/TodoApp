import { NextResponse, NextRequest } from "next/server";
import client from "../../../lib/mongoConnect";
import { getErrorMessage } from "utils/serverFunctions";
import { Todo } from "../../../lib/types";

interface TodoTask {
  task: string;
  isCompleted: boolean;
  createdAt: Date;
}

export async function POST(req: NextRequest) {
  try {
    const clientIntance = await client();
    const collection = clientIntance.db("TodoApp").collection("Todo");
    const { task }: { task: string } = await req.json();
    const todoTask: TodoTask = {
      task,
      isCompleted: false,
      createdAt: new Date(),
    };

    const insertDoc = await collection.insertOne(todoTask);
    const sendData: Todo = {
      ...todoTask,
      _id: insertDoc.insertedId.toString(),
    };

    return NextResponse.json(
      {
        status: "ok",
        data: sendData,
      },
      { status: 201 }
    );
  } catch (err) {
    const message: string = getErrorMessage(err);
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
