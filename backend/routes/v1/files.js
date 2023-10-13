import { Router } from 'express';
import AWS from 'aws-sdk';
import { connectToMongoDB } from '../../config/mongodb.js'

// Configure AWS with your credentials
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
    secretAccessKey: process.env.SECURITY_KEY,
});

const router = Router();

router.post('/fetch-file', async (req, res) => {
    try {
        if (!req.body.fileUrl) {
            res.status(401)
            throw new Error('Please provide file url')
        }
        else {
            const db = await connectToMongoDB();
            const collection = db.collection('files');

            //Delaying file fetching, bcuz concurrently lambda function will also take time 
            setTimeout(async () => {
                const file = await collection
                    .findOne({ video_url: req.body.fileUrl })
                res.status(201).json({ msg: 'Video file information', file });
            }, 5000)
        }
    }
    catch (error) {
        console.error('Error fetching file info from database', error);
        return res.status(500).json({ message: 'Error fetching file info from database', error: error });
    }
})

router.get('/upload', async (req, res) => {
    res.send({ msg: 'Upload Route Working' });
})

router.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.video) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        if (req.files.video) {
            // Create an S3 instance
            const s3 = new AWS.S3();
            // Specify the parameters for the S3 upload
            const videoFile = req.files.video;
            const params = {
                Bucket: process.env.VIDEO_BUCKET || '',
                Key: videoFile.name,
                Body: videoFile.data, // The file content
            };
            // Upload the file to S3
            const uploadResult = await s3.upload(params).promise();
            // console.log('File uploaded to S3:', uploadResult.Location);
            return res.status(200).json({
                message: 'File uploaded successfully',
                videoUrl: uploadResult.Location
            });
        }
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        return res.status(500).json({ message: 'Error uploading to S3', error: error });
    }
})

export default router;
