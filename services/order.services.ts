import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(async(data:any,res:Response,next:NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
        success:true,
        order,
      })

})

export const getAllOrdersService = async(res:Response) => {
  const courses = await OrderModel.find().sort({createdAt:-1});

  res.status(201).json({
      success:true,
      courses,
  })
}