import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "projects.json");

function getProjects() {
  if (!fs.existsSync(dataFilePath)) return [];
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    const newProject = await req.json();
    const projects = getProjects();

    newProject.id = Date.now().toString();
    newProject.slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    newProject.createdAt = new Date().toISOString();

    projects.unshift(newProject);
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updated = await req.json();
    let projects = getProjects();

    projects = projects.map((p: any) => (p.id === updated.id ? { ...p, ...updated } : p));
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    let projects = getProjects();
    projects = projects.filter((p: any) => p.id !== id);

    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}