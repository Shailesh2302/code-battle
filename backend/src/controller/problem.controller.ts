import { Request, Response } from "express";
import db from "../db/connectDB";

export const createProblem = async (req: Request, res: Response) => {
  try {
    const { id, title, description, sampleInput, sampleOutput, difficulty } =
      req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !sampleInput ||
      !sampleOutput
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problem = await db.problem.create({
      data: {
        id,
        title,
        description,
        sampleInput,
        sampleOutput,
        difficulty,
      },
    });

    if (!problem && problem == null) {
      throw new Error("Admin havn't filled the all fields");
    }

    return res.status(201).json({ message: "New problem is created" });
  } catch (error: any) {
    console.log("Error in problem controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const problems = await db.problem.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        sampleInput: true,
        difficulty: true,
        createdAt: true,
      },
    });

    if (!problems && problems == null) {
      throw new Error("there is no problems store");
    }

    return res
      .status(200)
      .json({ problems, message: "All problems successfully fetch" });
  } catch (error: any) {
    console.log("Error in problem controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProblem = async (req: Request, res: Response) => {
  try {
    const { problemId: id } = req.params;
  } catch (error: any) {
    console.log("Error in problem controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
