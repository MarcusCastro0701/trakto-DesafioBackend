import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { ImgService } from './img.service';
import { parse } from 'exifr';
import { bodyDTO } from './models/body.model';

@Controller('image')
export class ImgController {
  constructor(
    private readonly httpService: HttpService,
    private readonly imgService: ImgService,
  ) {}

  @Post('save')
  async saveImage(@Body() body: bodyDTO) {
    const { image, compress } = body;
    try {
      const response = await this.httpService
        .get(image, { responseType: 'arraybuffer' })
        .toPromise();
      const uniqueName = uuidv4();
      const fileName = `${uniqueName}.jpg`;
      const destination = './images';

      await fs.ensureDir(destination);

      const imgPath = `${destination}/${fileName}`;
      await fs.promises.writeFile(imgPath, response.data);

      const processedImg = await this.imgService.processImg(
        imgPath,
        fileName,
        compress,
      );
      await fs.promises.writeFile(
        `${destination}/${processedImg.fileName}`,
        processedImg.img,
      );

      const data = await parse(response.data);
      await this.imgService.insertExif(data);

      const returnObject = {
        localpath: {
          original: `./images/${destination}/${fileName}`,
          thumb: `./images/${destination}/${processedImg.fileName}`,
        },
        metadata: data,
      };

      return returnObject;
    } catch (error) {
      throw error;
    }
  }
}
