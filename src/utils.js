import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE } from './config'
import mkdirp from 'mkdirp'
import shortid from 'shortid'
import db from './models'
import fs from 'fs'

//CONFIG
const uploadDir = './uploads'
mkdirp.sync(uploadDir)

//UTILS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'takisinaja@gmail.com',
    pass: 'takis123'
  }
})

export const sendEmailVerification = async (user, userType) => {
  let { name, id: userId, email } = user
  let token = jwt.sign(
    {
      userId,
      userType,
      email
    },
    JWT.SECRET_KEY
  )

  user.verification_token = token
  await user.save()
  
  let domain = `${userType === USER_TYPE.CUSTOMER ? '' : 'mitra'}.ngopi.men`
  let link = `https://${domain}/token/${token}`

  const mailOptions = {
    from: 'takisinaja@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Hi ${name}, welcome to Takis</h1>
      <p>To verify your email, please click the Verify Email bellow</p>
      <div style="margin-top: 38px;
      margin-bottom: 8px;" >
      <a style="padding: 10px 20px;
      border-radius: 10px;
      color: white;
      background: #00BCD4;
      text-decoration: none;" href=${link}>Verify Email</a>
      </div>
      <br />
      <p>or if it is not working you can just copy this link and paste it into your browser</p>
      ${link}
    `
  }

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error)
      } else {
        console.log('Email sent: ' + info.response)
        resolve(info.response)
      }
    })
  })
}

export const storeFS = ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
}

export const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  const { id, path } = await storeFS({ stream, filename })
  return await db.models.Uploads.create({ id, filename, mimetype, encoding, path })
}

export default {
  sendEmailVerification,
  storeFS,
  processUpload,
}