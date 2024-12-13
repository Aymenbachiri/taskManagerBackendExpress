import { updateTaskSchema } from "@/lib/schema/validation";
import supabase from "@/lib/supabase/supabaseService";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Updates a task identified by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: string
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
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               completed:
 *                 type: boolean
 *
 *     responses:
 *       200:
 *         description: Task updated successfully.
 */

type Params = Promise<{ id: string }>;

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await req.json();
  const parseResult = updateTaskSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.errors },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("tasks")
    .update(parseResult.data)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json("Task updated successfully");
}

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID.
 *     description: Deletes a task identified by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 */
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(`Task ${id} deleted successfully`);
}
