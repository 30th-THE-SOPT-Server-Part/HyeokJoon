import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI); // .env 에 적어둔 connect URI로 연결

        mongoose.set("autoCreate", true); // autoCreate -> 서버 실행 시 Collection 자동 생성

        console.log("Mongoose Connected ...");
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
