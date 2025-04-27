import mongoose from "mongoose";
export const connectDB=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGOURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        // console.log('error occured')

        console.log(error);
        // process.exit(1);
    }

}