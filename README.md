<a name="readme-top"></a>

<div align="center" >
  <a href="https://github.com/gitesh152/mern-aws">
    <img src="https://res.cloudinary.com/dm34wmjlm/image/upload/v1696773114/MERN-AWS/mern-aws.logo_i9xz3v.png" alt="Logo" width="80" height="80">
    <h3 align="center">mern-aws</h3>
  </a>

  <p align="center">
    A simple mern application deployed, allow us to a video/mp4 file to s3 bucket and evoke aws lambda function to generate thumbnails.
    <br />
    <br />
    <!-- <a target="_blank" href="https://mern-aws-qnvn.onrender.com/" >Live Preview</a> -->
    <br />
    <!-- (wait for app server to restart from sleep ...) -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="#screenshots">Screenshots</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is mini assignment project demonstrating mern and aws collaberation.

Where user is able upload a video and in-behind file will be stored in AWS S3 Bucket.

Which will evoke lambda function to generate thumbails of this video and store thumbnails to another bucket.

This lambda function will also store s3 bucket files public urls to mongodb.

User is also provided a clean and clear previews modal of uploaded video and generated thumbnails,

alonghtwith their download urls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## screenshots

Home
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180460/MERN-AWS/Home_a7oywa.png)

Drag and Drop a video/mp4 file or Select a file
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180460/MERN-AWS/select-file_pujdvz.png)

Submit a file
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180474/MERN-AWS/upload-file_wiznia.png)

Preview video and thumbnails
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180479/MERN-AWS/preview-file_h6djvh.png)

S3 Video Bucket
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180466/MERN-AWS/video-bucket_qmupu5.png)

S3 Thumbnail Bucket
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180466/MERN-AWS/thumbnail-bucket_jfsa0b.png)

Database Records
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1697180473/MERN-AWS/database_tzkx2z.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<ol>
<li>AWS Services</li>
<li>ExpressJS</li>
<li>ReactJS</li>
<li>NodeJS</li>
<li>ChakraUI</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] *Application Setup:*  
      Create a web application using ReactJs for the frontend and ExpressJs for the backend.  
      Set up a MongoDB database to store the video and thumbnail URLs.  

- [x] *Video Upload to AWS S3:*  
      Implement a feature in the application that allows users to upload videos.  
      Integrate the application with AWS S3 to handle video storage.  
      When a user uploads a video, the application should save the video to an AWS S3 bucket.  

- [x] *Lambda Function Trigger:*  
      Configure AWS S3 to trigger a Lambda function once the video upload is complete.  
      The Lambda function will automatically be invoked.  
      when a new video is uploaded to the designated S3 bucket.  

- [x] *Thumbnail Extraction and Storage:*  
      Inside the Lambda function, extract a thumbnail image from the uploaded video.  
      Save the thumbnail image to a different S3 bucket specifically designated for thumbnails.  
      Obtain the thumbnail URL.  

- [x] *Save the thumbnail URL and the video URL along with a unique identifier (ID) into the MongoDB database.*  
      Each entry in the database should consist of the following fields:  

      
        {
            _id: "AC687facs7600182",
            thumb_url: "https://bucketname1.us-east1.com/filename.jpg",
            video_url: "https://bucketname2.us-east1.com/filename.mp4"
        }

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Get started with setting up project in a environment.


### Prerequisites

Visual Studio Code or other editor.

AWS Account with IAM User & permissions.


### Installation

Carefully create all resources in same region and AZ 

***Set Up AWS S3 video bucket and thumbnails bucket and lambda function evoked by video bucket***

**1-Create Buckets**

The first thing we need is an S3 bucket where we can upload our videos.  

Go to the AWS Console, search for S3 and click 'Create bucket'.  

Bucket name:    video-buck3t  

AWS Region:     ap-south-1  

Untick - (Block all public access)

Tick - (I acknowledge that the current settings might result in this bucket 
and the objects within becoming public.)  

Create Bucket - Done  

Create another bucket for thumbnails -> Create Bucket

Bucket name:    thumbnail-buck3t

AWS Region:     ap-south-1

Untick (Block all public access)

Tick (I acknowledge that the current settings might result in this bucket 
and the objects within becoming public.)

Create Bucket - Done

//We will define this bucket policy later after creating lambda function.

**2-Create Lambda Function**

Author from scratch

Function name - thumbnail-generator

Runtime - Node.js 18.x

Architecture - x86_64

Create a new role with basic Lambda permissions

Create function - Done

Now goto lambda function configuration -> Click Role Name ->

Then Add Permission (AmazonS3FullAccess) to this role for manipulating S3 bucket. 

Copy Role ARN and use it for our video and thumbnail bucket policies,

Goto video-buck3t Bucket -> Bucket Policy -> Paste this policy which have our thumbnailGenerator role  

  ```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::986426981341:role/service-role/mern-aws-dev-thumbnailGenerator-handler-role-9j8ydh8f"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::video-buck3t/*"
        }
    ]
}
```

**Note-** 

Or we can also make our video publicly available by using '*' in place of thumbnail-function role

which can be usefull for showing video to web applicattion frontend.


Goto thumbnail-buck3t -> Bucket Policy -> Paste this policy which have our thumbnailGenerator role
    
    First statement define that only this lambda function can add thumbail file to this bucket
    
    and second statement define anyone can read thumbnail file

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::986426981341:role/service-role/mern-aws-dev-thumbnailGenerator-handler-role-9j8ydh8f"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::thumbnail-buck3t/*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thumbnail-buck3t/*"
        }
    ]
}
```

//  Video and Thubmnail bucket policies are set now.

//  Add a trigger for our lambda function

Add triger ->

select a source -   s3

Bucket -            video-buck3t

Suffix -            .mp4 

Tick acknowledgement

//  Now This function will be invoked when new video file is stored in video-buck3t bucket.

**3-Use ffmpeg to generate thumbnails from the video**

ffmpeg -
FFmpeg is a free and open - source software project consisting of a suite of libraries and programs for handling video, audio, and other multimedia files and streams

We will use ffmpeg layer from AWS Serverless Application Repository(SAR).

Which is available this url, goto this url
```
https://serverlessrepo.aws.amazon.com/applications/us-east-1/145266761615/ffmpeg-lambda-layer
```
Click deploy -> Goto layers -> select ffmpeg -> copy ARN

**Note-**

The contents of the layer like FFprobe(for duration of video), ffmpegPath etc 

are available in the /opt/directory



Now goto thumbnail-generator function -> layers -> Add a Layer -> specify an ARN

Paste our ffmpeg ARN:
```
arn:aws:lambda:ap-south-1:986426981341:layer:ffmpeg:1
```

**4-Creating mongoose layer**

We will also create mongoose layer so that we can use mongoose(mongodb) for storing s3 bucket public urls.

In visual studio code(any),

create folder mongoose-layer

create its subfolder nodejs

goto nodejs directory in terminal 

(no need to initialize npm)

install mongoose library 'npm install mongoose'

we will have node_modules folder with mongoose related packages inside nodejs folder.

Create a zip file named mongoose-layer of nodejs folder
Now we have mongoose-layer.zip inside mongoose-layer folder

Goto Lambda -> layers -> create layer -> 

name :      mongoose-layer

Upload zip file mongoose-layer

Compatible architectures -  x86_64 (optional)

Compatible runtimes      -  Node.js 18x

Create -> Done

Now goto thumbnail-generator function -> layers -> Add a Layer -> Custom layers
    -> select layer and version


**5-Define environment variables for our lambda function**

Goto thumbnail-generator function -> Configuration -> Environment variables

Add variables

MONGO_URI                         :     "your mongo url with db name"

NUMBER_OF_THUMBNAILS_TO_CREATE	  :     "number of thumbnails"

VIDEO_BUCKET                      :     "video bucket key"

THUMBNAIL_BUCKET                  :     "thumbnail bucket key"

REGION                            :     "ap-south-1"

Save -> Done

**6-Create a test case**

Before writing main script test if our lambda can access envrionment variables , buckets and mongodb is working or not. 

Goto Test Tab -> Create new event -> 

Event Name :        S3VideoUpload

template :          s3-put

Edit event json -

awsRegion   :       ap-south-1

(s3)
name        :       video-buck3t

arn         :       arn:aws:s3:::video-buck3t

(object)        //our demo big.mp4 file with 2 mb size
key :               big.mp4,

size        :       2048,

Edit handler file for testing

```
index.mjs-
export const handler = async (event) => {
  
  const { videoFileName, triggerBucketName } = extractParams(event);
  
  console.log(`Received ${videoFileName} file from ${triggerBucketName} bucket`)
  
  console.log('MONGO_URI',process.env.MONGO_URI)
  
  console.log('NUMBER_OF_THUMBNAILS_TO_CREATE',process.env.NUMBER_OF_THUMBNAILS_TO_CREATE)
  
  console.log('THUMBNAIL_BUCKET',process.env.THUMBNAIL_BUCKET)
  
  console.log('VIDEO_BUCKET',process.env.VIDEO_BUCKET)

  console.log('REGION',process.env.REGION)
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

const extractParams = event => {
	const videoFileName = decodeURIComponent(event.Records[0].s3.object.key).replace(/\+/g, " ");
	const triggerBucketName = event.Records[0].s3.bucket.name;

	return { videoFileName, triggerBucketName };
};
```

Test -> Working :)


**Note-**

Lambdas have a default memory of 128MB and a timeout of 3 seconds. 

What we're doing might take longer than 3 seconds and require a bit more RAM, so let's increase both. 

Goto Configuration -> General Configuration -> Edit 

Memory - 1024

Timeout - 30sec

Done.

**7-Create scripts for creating thumbnail from video**

Goto Code Source.

//So main ideas are-
 
First we extract triggerBucketName and videoFileName from lambda function evoking event.

Then use those as bucket name and key alongwith 'AWS-SDK' to Download video file  

from bucket and dump it to temp directory(default size 512MB) inside lambda function directory

We will store file with random hash name like '/tmp/video-someRandomHash.mp4.'

and to do so we will create generateTmpFilePath which take video-name-template and return hashed tmpVideoFilePath.

We use 'FFprobe' to get video duration, 

Using this video duration we will select random points or seconds in video for selecting thumbnails in video.

We will again use generateTmpFilePath with these random points alongth & thumbnail name template to generate 

thumbnailPathWithNumber to store thumbnail on that path.

we will also generate thumbnail-image-name basis of video name and and incremental index starting from 0.

And store this name as key to thumbnail s3 bucket 'thumbnail-buck3t'

We also use thumbnailPublicUrls array to hold thumbnail-image-names

Finally we will call FFmpeg to generate the thumbnails and we save thumbnails to /tmp/

while saving thumbnails,we check if file already exists.

Then we will upload the thumbnails to S3,

At last we can call a function storePublicUrls which take videoFileName and thumbnail-image-name array

and store both to mongodb using mongoose-layer.

Lets Goto thubmbnail-generator lambda function -> Code 

create these files with code.

***index.mjs-***
```
import fs from "fs";
import path from "path";
import doesFileExist from "./does-file-exist.mjs";
import downloadVideoToTmpDirectory from "./download-video-to-tmp-directory.mjs";
import generateThumbnailsFromVideo from "./generate-thumbnails-from-video.mjs";

const NUMBER_OF_THUMBNAILS_TO_CREATE = process.env.NUMBER_OF_THUMBNAILS_TO_CREATE || 2;

export const handler = async (event) => {
    await wipeTmpDirectory();
	const { videoFileName, triggerBucketName } = extractParams(event);
	const tmpVideoPath = await downloadVideoToTmpDirectory(triggerBucketName, videoFileName);

	if (doesFileExist(tmpVideoPath)) {
		await generateThumbnailsFromVideo(tmpVideoPath, NUMBER_OF_THUMBNAILS_TO_CREATE, videoFileName);
	}
};

const extractParams = event => {
	const videoFileName = decodeURIComponent(event.Records[0].s3.object.key).replace(/\+/g, " ");
	const triggerBucketName = event.Records[0].s3.bucket.name;

	return { videoFileName, triggerBucketName };
};

const wipeTmpDirectory = async () => {
    const files = await fs.promises.readdir("/tmp/");
    const filePaths = files.map(file => path.join("/tmp/", file));
    await Promise.all(filePaths.map(file => fs.promises.unlink(file)));
}
```

***does-file-exist.mjs-***
```
import fs from "fs";

export default (filePath) => {
	if (fs.existsSync(filePath)) {
		const stats = fs.statSync(filePath);
		const fileSizeInBytes = stats.size;

		if (fileSizeInBytes > 0) {
            console.log(`${filePath} exists!`); // Remove this once your proof-of-concept is working
			return true;
		} else {
			console.error(`${filePath} exists but is 0 bytes in size`);
			return false;
		}
	} else {
		console.error(`${filePath} does not exist`);
		return false;
	}
};
```

***download-video-to-tmp-directory.mjs-***
```
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import generateTmpFilePath from "./generate-tmp-file-path.mjs";

export default async (triggerBucketName, videoFileName) => {
	const downloadResult = await getVideoFromS3(triggerBucketName, videoFileName);
	const videoAsBuffer = downloadResult.Body;
	const tmpVideoFilePath = await saveFileToTmpDirectory(videoAsBuffer);

	return tmpVideoFilePath;
}

const getVideoFromS3 = async (triggerBucketName, fileName) => {
	const s3 = new S3();
	const res = await s3.getObject({
		Bucket: triggerBucketName,
		Key: fileName
	});

	return res;
};

const saveFileToTmpDirectory = async (fileAsBuffer) => {
    const tmpVideoPathTemplate = "/tmp/vid-{HASH}.mp4";
    const tmpVideoFilePath = generateTmpFilePath(tmpVideoPathTemplate);
	await fs.promises.writeFile(tmpVideoFilePath, fileAsBuffer, "base64");

	return tmpVideoFilePath;
};
```

***generate-thumbnails-from-video.mjs-***
```
import fs from "fs";
import { S3 } from "@aws-sdk/client-s3";
import { spawnSync } from "child_process";
import doesFileExist from "./does-file-exist.mjs";
import generateTmpFilePath from "./generate-tmp-file-path.mjs";
import storePublicUrls from "./store-public-url-to-mongodb.mjs";

const ffprobePath = "/opt/bin/ffprobe";
const ffmpegPath = "/opt/bin/ffmpeg";

const THUMBNAIL_BUCKET = process.env.THUMBNAIL_BUCKET;
const VIDEO_BUCKET = process.env.VIDEO_BUCKET;
const REGION = process.env.REGION;

export default async (tmpVideoPath, numberOfThumbnails, videoFileName) => {
    const randomTimes = generateRandomTimes(tmpVideoPath, numberOfThumbnails);
    let thumbnailPublicUrls=[];
    let videoPublicUrl=`https://${VIDEO_BUCKET}.s3${'.'+REGION}.amazonaws.com/${videoFileName}`;
    
    for(const [index, randomTime] of Object.entries(randomTimes)) {
        const tmpThumbnailPath = await createImageFromVideo(tmpVideoPath, randomTime);

        if (doesFileExist(tmpThumbnailPath)) {
            const nameOfImageToCreate = generateNameOfImageToUpload(videoFileName, index);
            thumbnailPublicUrls.push(`https://${THUMBNAIL_BUCKET}.s3${'.'+REGION}.amazonaws.com/${nameOfImageToCreate}`);
            await uploadFileToS3(tmpThumbnailPath, nameOfImageToCreate);
        }
    }
    
    //store files public url to mongoDB.
    await storePublicUrls(videoPublicUrl,thumbnailPublicUrls);
}

const generateRandomTimes = (tmpVideoPath, numberOfTimesToGenerate) => {
    const timesInSeconds = [];
    const videoDuration = getVideoDuration(tmpVideoPath);

    for (let x = 0; x < numberOfTimesToGenerate; x++) {
        const randomNum = getRandomNumberNotInExistingList(timesInSeconds, videoDuration);
        
        if(randomNum >= 0) {
            timesInSeconds.push(randomNum);
        }
    }

    return timesInSeconds;
};

const getRandomNumberNotInExistingList = (existingList, maxValueOfNumber) => {
    for (let attemptNumber = 0; attemptNumber < 3; attemptNumber++) {
        const randomNum = getRandomNumber(maxValueOfNumber);
        
        if (!existingList.includes(randomNum)) {
            return randomNum;
        }
    }
    
    return -1;
}

const getRandomNumber = (upperLimit) => {
    return Math.floor(Math.random() * upperLimit);
};

const getVideoDuration = (tmpVideoPath) => {
    const ffprobe = spawnSync(ffprobePath, [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=nw=1:nk=1",
        tmpVideoPath
    ]);

    return Math.floor(ffprobe.stdout.toString());
};

const createImageFromVideo = (tmpVideoPath, targetSecond) => {
    const tmpThumbnailPath = generateThumbnailPath(targetSecond);
    const ffmpegParams = createFfmpegParams(tmpVideoPath, tmpThumbnailPath, targetSecond);
    spawnSync(ffmpegPath, ffmpegParams);

    return tmpThumbnailPath;
};

const generateThumbnailPath = (targetSecond) => {
    const tmpThumbnailPathTemplate = "/tmp/thumbnail-{HASH}-{num}.jpg";
    const uniqueThumbnailPath = generateTmpFilePath(tmpThumbnailPathTemplate);
    const thumbnailPathWithNumber = uniqueThumbnailPath.replace("{num}", targetSecond);
    console.log(targetSecond);
    console.log(thumbnailPathWithNumber);
    return thumbnailPathWithNumber;
};

const createFfmpegParams = (tmpVideoPath, tmpThumbnailPath, targetSecond) => {
    return [
        "-ss", targetSecond,
        "-i", tmpVideoPath,
        "-vf", "thumbnail,scale=160:90",
        "-vframes", 1,
        tmpThumbnailPath
    ];
};

const generateNameOfImageToUpload = (videoFileName, i) => {
    const strippedExtension = videoFileName.replace(".mp4", "");
    return `${strippedExtension}-${i}.jpg`;
};

const uploadFileToS3 = async (tmpThumbnailPath, nameOfImageToCreate) => {
    const contents = fs.createReadStream(tmpThumbnailPath);
    const uploadParams = {
        Bucket: THUMBNAIL_BUCKET,
        Key: nameOfImageToCreate,
        Body: contents,
        ContentType: "image/jpg"
    };

    const s3 = new S3();
    await s3.putObject(uploadParams);
};
```

***generate-tmp-file-path.mjs-***
```
export default (filePathTemplate) => {
    const hash = getRandomString(10);
	const tmpFilePath = filePathTemplate.replace("{HASH}", hash);

	return tmpFilePath;
}

const getRandomString = (len) => {
    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";

	for (let i = len; i > 0; --i) {
		result += charset[Math.floor(Math.random() * charset.length)];
	}

	return result;
}
```

***store-public-url-to-mongodb.mjs-***
```
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const fileSchema = new mongoose.Schema({
    video_url: {
        type: String,
        required: true
    },
    thumbnail_urls: [{
        type: String,
        required: true
    }],
}, { timestamps: true })

const File = mongoose.model('File', fileSchema);

const connectDB = async () => {
    try {
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected : ${con.connection.host}`)
    }
    catch (error) {
        console.log(`Error :`, error.message)
        process.exit()
    }
}
connectDB();

export default async(video_url,thumbnail_urls)=>{
    try{
        
        
    var query = {video_url}, update = { thumbnail_urls }, options = { upsert: true, new: true };
    //if document with videoUrl exists then update thumbnailsUrl (either video is new or existing, new thumbnails will always be generated)
    //else create new document with new video and new thubmnails urls.
    
    const doc=await File.findOneAndUpdate(query, update, options);
    console.log(doc)
    }
    catch(error){
        console.log(error);
    }
}
```

Done


***Set Up Project in Local IDE***

**Backend**

1. Open Terminal and Clone Project
```sh
git clone https://github.com/gitesh152/mern-aws.git
```

2. Goto the project folder
```sh
cd mern-aws
```

3. Install NPM packages in backend folder
```sh
npm install
```

4. Create .env file and store environment variables like
    ACCESS_KEY, SECURITY_KEY, VIDEO_BUCKET, MONGO_URI, DB_NAME and REGION
```sh
touch .env
```

6. Initialize backend server
```sh
npm start
```

Now create another terminal

7. Goto frontend folder
```js
cd frontend
```

8. Install frontend dependencies
```js
npm install
```

9. Open vite.config.js and config server proxy with our copied endpoint
```js
server: {
    proxy: {
      '/api': 'backend api endpint', // Replace with your backend API's URL
    }
  }
```

15. Open FileDropzone.jsx file and paste our copied endpoint to API_URL variable like below
```js
var API_URL = ` your endpoint here /api/v1`;
```

16. Start frontend server
```js
npm run dev
```

Goto ```http://localhost:5173/``` and check our application

Upload video and See preview of our video and thumbnails.

Done.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This project is a powerful demonstration of mern-aws collaberation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Gitesh Kumar

[@LinkedIn](https://www.linkedin.com/in/gitesh-kumar-an5h/) - https://www.linkedin.com/in/gitesh-kumar-an5h/

[@Gmail](https://mail.google.com/mail/u/0/?fs=1&to=gitesh152@gmail.com&su=SUBJECT&body=BODY&tf=cm) - gitesh152@gmail.com/

Project Link: [https://github.com/gitesh152/mern-aws](https://github.com/gitesh152/mern-aws)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are some more useful libraries and resources used in project

<ol>
<li>axios</li>
<li>ffmpeg</li>
<li>chakra-ui</li>
<li>prop-types</li>
<li>react-icons</li>
<li>react-dropzone</li>
<li>express-fileupload</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>