import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { exifCollection } from './db.module';

@Injectable()
export class ImgService {
  async processImg(input: string, fileName: string, compress: number) {
    const meta = await sharp(input).metadata();

    let width = meta.width;
    let height = meta.height;

    if (width > 720 || height > 720) {
      const newImg = await sharp(input)
        .resize(720, 720, { fit: 'inside' })
        .jpeg({ quality: compress * 10 })
        .toBuffer();

      const response = {
        img: newImg,
        fileName: `${fileName.slice(0, -4)}_thumb.${meta.format}`,
      };

      return response;
    } else {
      const copy = await sharp(input).toBuffer();

      const response = {
        img: copy,
        fileName: `${fileName.slice(0, -4)}_thumb.${meta.format}`,
      };

      return response;
    }
  }

  async insertExif(exif: object) {
    try {
      const result = await exifCollection.insertOne(exif);
      const send = await exifCollection.find({}).toArray();
      console.log(send, 'SEND AQUI')
      return result;
    } catch (error) {
      throw error;
    }
  }
}
