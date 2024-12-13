import { taskSchema } from "@/lib/schema/validation";
import supabase from "@/lib/supabase/supabaseService";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Returns a list of all tasks.
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                       priority:
 *                         type: string
 *                         enum: [low, medium, high]
 *                       completed:
 *                         type: boolean
 */
export async function GET() {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ tasks: data });
}

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Add a new task
 *     description: Creates a new task with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *               duedate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               completed:
 *                 type: boolean
 *
 *     responses:
 *       201:
 *         description: Task created successfully.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = taskSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.errors },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("tasks").insert([parseResult.data]);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json("Task created successfully", { status: 201 });
}
