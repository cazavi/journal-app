import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'dkuc5ctm1',
  api_key: '649618573498193',
  api_secret: '0v9P8DWjVP0wCgUVWy_hTxZaA9k',
  secure: true
})

describe('Pruebas en fileUpload', () => {
  
  test('debe de subir el archivo correctamente a cloudinary', async() => {
    const imageUrl = 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg','');

    await cloudinary.api.delete_resources(['journal/' + imageId],{
      resource_type: 'image'
    });
  });
  
  test('debe de retornar null', async() => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});