import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid updates format" },
        { status: 400 }
      );
    }

    const nodesDir = path.join(process.cwd(), "nodes");
    const files = fs.readdirSync(nodesDir).filter((f) => f.endsWith(".hls"));

    for (const file of files) {
      const filePath = path.join(nodesDir, file);
      let content = fs.readFileSync(filePath, "utf-8");
      let modified = false;

      for (const update of updates) {
        const { oldText, newText } = update;
        if (content.includes(oldText)) {
          content = content.replace(oldText, newText);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, "utf-8");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating HLS files:", error);
    return NextResponse.json(
      { error: "Failed to update files" },
      { status: 500 }
    );
  }
}
