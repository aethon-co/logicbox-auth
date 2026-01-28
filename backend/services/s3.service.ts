import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3";

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination?: string;
    filename?: string;
    path?: string;
    buffer?: Buffer;
}

export const uploadVideo = async (file: MulterFile, folder = "Videos") => {
    if (!file) {
        throw new Error("No file");
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    const key = `${folder}/${fileName}`;

    const upload = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    })

    await s3Client.send(upload);
    return key;
}


export const deleteFromS3 = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    });

    try {
        await s3Client.send(command);
    } catch (error) {
        console.error("Error deleting from S3:", error);
        throw error;
    }
}