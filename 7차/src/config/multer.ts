import multer from "multer";
import multerS3 from "multer-s3";
import config from ".";
import s3 from "./s3Config";

const upload = multer({
    // 미들웨어로 사용할 multer 생성
    storage: multerS3({
        s3: s3, // 실질적인 storage는 multerS3 이용해 aws s3로 설정
        bucket: config.bucketName, // s3 bucket name 지정
        contentType: multerS3.AUTO_CONTENT_TYPE, // mimetype은 자동으로 설정
        acl: "public-read", // Access control for the file
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
            // key -> 파일 이름 정의
            cb(null, `${Date.now()}_${file.originalname}`); // bucket 내에서 이름이 겹치면 동일 파일로 인식해서 보통 고유하게 만든다.
        },
    }),
});

export default upload;
