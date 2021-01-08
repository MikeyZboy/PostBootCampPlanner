const { S3 } = require('aws-sdk')
require('dotenv').config()
const { AWS_ID, AWS_SECRET, AWS_REGION, AWS_BUCKET } = process.env

const s3 = new S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
})

const upload = async (file) => {
    let conf = {
    Bucket: AWS_BUCKET,
    ACL: 'public-read',
    Key: `${file.fieldname}-${file.originalname}`,
    Body: file.buffer,
    ContentLength: file.size,
    ContentType: file.mimetype
    }
const uploadedFile = await s3.upload(conf).promise()
return uploadedFile.Location
}

module.exports = upload
